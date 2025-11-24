import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import vanInterior from "@/assets/van-interior.jpg";
import { useTranslation } from "@/contexts/TranslationContext";

const VanOptions = () => {
  const { t } = useTranslation();
  
  const rentalIncludes = [
    t.vanOptions.item1,
    t.vanOptions.item2,
    t.vanOptions.item3,
    t.vanOptions.item4,
    t.vanOptions.item5,
    t.vanOptions.item6,
    t.vanOptions.item7
  ];

  const ownVanBenefits = [
    t.vanOptions.ownBenefit1,
    t.vanOptions.ownBenefit2,
    t.vanOptions.ownBenefit3,
    t.vanOptions.ownBenefit4,
    t.vanOptions.ownBenefit5,
    t.vanOptions.ownBenefit6
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Rental Option */}
          <Card className="p-8 shadow-[var(--card-shadow)]">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {t.vanOptions.rentalTitle}
            </h2>
            <div className="mb-6">
              <img src={vanInterior} alt="Interior da van equipada" className="rounded-lg w-full h-64 object-cover" />
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              {t.vanOptions.rentalSubtitle}
            </p>
            <ul className="space-y-3">
              {rentalIncludes.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xl font-bold text-primary mt-8 text-center">
              {t.vanOptions.rentalConclusion}
            </p>
          </Card>

          {/* Own Van Option */}
          <Card className="p-8 shadow-[var(--card-shadow)] bg-secondary text-secondary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {t.vanOptions.ownTitle}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {t.vanOptions.ownSubtitle}
            </p>
            <ul className="space-y-3">
              {ownVanBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VanOptions;
