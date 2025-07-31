import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator } from 'lucide-react';

export function Hero() {
  const handleLifetimeClick = () => {
    if (typeof window !== 'undefined' && (window as any).LemonSqueezy) {
      (window as any).LemonSqueezy.Url.Open('https://buxtax.lemonsqueezy.com/checkout/buy/PRODUCT_LIFETIME_ID?checkout[success_url]=https://buxtax.com/thank-you');
    } else {
      window.open('https://buxtax.lemonsqueezy.com/checkout/buy/PRODUCT_LIFETIME_ID?checkout[success_url]=https://buxtax.com/thank-you', '_blank');
    }
  };

  const handleStudioClick = () => {
    if (typeof window !== 'undefined' && (window as any).LemonSqueezy) {
      (window as any).LemonSqueezy.Url.Open('https://buxtax.lemonsqueezy.com/checkout/buy/PRODUCT_STUDIO_ID?checkout[success_url]=https://buxtax.com/thank-you');
    } else {
      window.open('https://buxtax.lemonsqueezy.com/checkout/buy/PRODUCT_STUDIO_ID?checkout[success_url]=https://buxtax.com/thank-you', '_blank');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream to-cream/50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black font-rounded text-royal leading-tight">
                Turn Robux Into Real-World Cash,{' '}
                <span className="text-cherry">Instantly Today</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Know exactly what you'll bank after Roblox fees—no spreadsheets.
                Calculate your DevEx earnings in seconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-royal hover:bg-royal/90"
                onClick={handleLifetimeClick}
              >
                Get Lifetime Access - $39
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-cherry text-cherry hover:bg-cherry hover:text-white"
                onClick={handleStudioClick}
              >
                Studio Plan - $149
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>✓ Instant calculations</span>
              <span>✓ No recurring fees</span>
              <span>✓ 30-day guarantee</span>
            </div>
          </motion.div>

          {/* Right Column - Animated Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-royal/10">
              {/* Mock Calculator Interface */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Calculator className="w-6 h-6 text-royal" />
                  <h3 className="font-rounded font-semibold text-lg">BuxTax Calculator</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Robux Amount</label>
                    <div className="bg-gray-50 rounded-lg px-4 py-3 text-lg font-semibold">
                      100,000 R$
                    </div>
                  </div>

                  <motion.div
                    animate={{ 
                      scale: [1, 1.02, 1],
                      boxShadow: ['0 0 0 0 rgba(24, 32, 239, 0)', '0 0 0 10px rgba(24, 32, 239, 0.1)', '0 0 0 0 rgba(24, 32, 239, 0)']
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="bg-royal/5 border-2 border-royal/20 rounded-lg p-4"
                  >
                    <div className="text-sm text-muted-foreground mb-1">You'll receive:</div>
                    <div className="text-2xl font-bold text-royal">$350.00 USD</div>
                    <div className="text-xs text-muted-foreground">After all fees</div>
                  </motion.div>
                </div>

                {/* Animated Robux to Dollar Transformation */}
                <div className="flex items-center justify-center space-x-4 py-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    R$
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-royal"
                  >
                    →
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    $
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-cherry text-white rounded-full w-16 h-16 flex items-center justify-center font-bold shadow-lg"
            >
              Fast
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-4 -left-4 bg-yellow text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg text-sm"
            >
              Easy
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}