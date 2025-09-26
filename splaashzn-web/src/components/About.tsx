import { useTranslation } from './hooks/useTranslation';
import { Card, CardContent } from './ui/card';
import { Shield, Award, Truck, Users, Star, Clock } from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: t.aboutPage.authenticity.title,
      description: t.aboutPage.authenticity.description
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: t.aboutPage.quality.title, 
      description: t.aboutPage.quality.description
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: t.aboutPage.shipping.title,
      description: t.aboutPage.shipping.description
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t.aboutPage.support.title,
      description: t.aboutPage.support.description
    }
  ];

  const stats = [
    { number: "50,000+", label: t.aboutPage.stats.customers },
    { number: "15+", label: t.aboutPage.stats.years },
    { number: "500+", label: t.aboutPage.stats.teams },
    { number: "4.9", label: t.aboutPage.stats.rating, icon: <Star className="h-4 w-4 text-yellow-500" /> }
  ];

  return (
    <section className="py-16 bg-gray-50" id="about">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4">{t.aboutPage.title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.aboutPage.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-4xl font-bold text-blue-600">{stat.number}</span>
                {stat.icon && <span className="ml-1">{stat.icon}</span>}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h4 className="mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="mb-6">{t.aboutPage.story.title}</h3>
              <div className="space-y-4 text-gray-600">
                <p>{t.aboutPage.story.paragraph1}</p>
                <p>{t.aboutPage.story.paragraph2}</p>
                <p>{t.aboutPage.story.paragraph3}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h5 className="mb-2">{t.aboutPage.timeline.founded.title}</h5>
                  <p className="text-gray-600 text-sm">{t.aboutPage.timeline.founded.description}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h5 className="mb-2">{t.aboutPage.timeline.expansion.title}</h5>
                  <p className="text-gray-600 text-sm">{t.aboutPage.timeline.expansion.description}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h5 className="mb-2">{t.aboutPage.timeline.community.title}</h5>
                  <p className="text-gray-600 text-sm">{t.aboutPage.timeline.community.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};