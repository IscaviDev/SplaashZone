import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useTranslation } from './hooks/useTranslation';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3>FutbolShirt Store</h3>
            <p className="text-gray-300 text-sm">
              {t.companyDescription}
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4>{t.quickLinks}</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.home}
              </a>
              <a href="#products" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.products}
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.about}
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.contact}
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.termsConditions}
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t.privacyPolicy}
              </a>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4>{t.customerService}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">info@futbolshirt.es</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-300">
                  Calle del Fútbol, 123<br />
                  28001 Madrid, España
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <p>{t.mondayFriday}</p>
              <p>{t.saturday}</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4>{t.newsletter}</h4>
            <p className="text-gray-300 text-sm">
              {t.newsletterDescription}
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="w-full">
                {t.subscribe}
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              {t.subscribeDisclaimer}
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © 2024 FutbolShirt Store. {t.allRightsReserved}
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>{t.securePayment}</span>
            <span>{t.fastShipping}</span>
            <span>{t.easyReturns}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}