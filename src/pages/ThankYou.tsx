import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function ThankYou() {
  useEffect(() => {
    // Track conversion event
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('Purchase');
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-rounded">Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for your purchase. Your BuxTax account has been activated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">What's next?</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Access to all calculator features</li>
                <li>• Detailed conversion breakdowns</li>
                <li>• Export your calculations</li>
                <li>• Priority support</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/app">Start Calculating</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/account">View Account</Link>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>You should receive a confirmation email shortly.</p>
              <p className="mt-2">
                Need help? Contact us at{' '}
                <a href="mailto:support@buxtax.com" className="text-royal hover:underline">
                  support@buxtax.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}