import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, PieChart, Download } from 'lucide-react';
import features from '@/data/features.json';

const iconMap = {
  calculator: Calculator,
  'pie-chart': PieChart,
  download: Download,
};

export function Features() {
  return (
    <section className="py-16 bg-cream/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-rounded font-bold text-royal mb-4">
            Everything you need to calculate your earnings
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple, accurate, and comprehensive tools for Roblox developers and creators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center border-royal/10 hover:border-royal/20 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="mx-auto w-16 h-16 bg-royal/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-royal/20 transition-colors"
                    >
                      <IconComponent className="w-8 h-8 text-royal" />
                    </motion.div>
                    
                    <h3 className="text-xl font-rounded font-bold text-royal mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl border border-royal/10 p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-rounded font-bold text-royal text-center mb-8">
              Why developers choose BuxTax
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cherry rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Always Up-to-Date</h4>
                    <p className="text-sm text-muted-foreground">
                      Rates updated automatically when Roblox changes DevEx rates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cherry rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Privacy Focused</h4>
                    <p className="text-sm text-muted-foreground">
                      All calculations done locally - your data never leaves your device
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cherry rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Mobile Friendly</h4>
                    <p className="text-sm text-muted-foreground">
                      Calculate on the go with our responsive mobile interface
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cherry rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Export Ready</h4>
                    <p className="text-sm text-muted-foreground">
                      Download calculations for taxes and financial records
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}