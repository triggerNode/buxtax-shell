import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { User, CreditCard, LogOut, ArrowLeft } from 'lucide-react';

function AccountContent() {
  const { user, signOut } = useAuth();
  const { profile, loading } = useProfile();
  const { toast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const { error } = await signOut();
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
    setIsSigningOut(false);
  };

  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case 'lifetime':
        return 'default';
      case 'studio':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'default' : 'destructive';
  };

  const formatPlanName = (plan: string) => {
    switch (plan) {
      case 'lifetime':
        return 'Lifetime Access';
      case 'studio':
        return 'Studio Plan';
      case 'free':
        return 'Free Plan';
      default:
        return plan;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-royal hover:text-royal/80">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-rounded font-bold text-royal">Account</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isSigningOut ? 'Signing out...' : 'Sign Out'}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <CardTitle>Profile Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="text-foreground">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <CardTitle>Subscription</CardTitle>
              </div>
              <CardDescription>
                Manage your BuxTax subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile ? (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Current Plan</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPlanName(profile.plan)}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant={getPlanBadgeVariant(profile.plan)}>
                        {formatPlanName(profile.plan)}
                      </Badge>
                      <Badge variant={getStatusBadgeVariant(profile.status)} className="block">
                        {profile.status}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {profile.plan === 'free' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Upgrade Your Plan</h4>
                      <p className="text-sm text-yellow-700 mb-3">
                        Unlock unlimited calculations and advanced features with a paid plan.
                      </p>
                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          onClick={() => {
                            window.open('https://buxtax.lemonsqueezy.com/checkout/buy/PRODUCT_LIFETIME_ID?checkout[success_url]=https://buxtax.com/thank-you', '_blank');
                          }}
                        >
                          Upgrade to Lifetime - $39
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            window.open('https://buxtax.lemonsqueezy.com/checkout/buy/PRODUCT_STUDIO_ID?checkout[success_url]=https://buxtax.com/thank-you', '_blank');
                          }}
                        >
                          Upgrade to Studio - $149
                        </Button>
                      </div>
                    </div>
                  )}

                  {profile.status === 'active' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-1">✅ Account Active</h4>
                      <p className="text-sm text-green-700">
                        Your account is active and all features are unlocked.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Loading subscription information...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/app">
                  Open Calculator
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <a href="mailto:support@buxtax.com">
                  Contact Support
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Account() {
  return (
    <ProtectedRoute>
      <AccountContent />
    </ProtectedRoute>
  );
}