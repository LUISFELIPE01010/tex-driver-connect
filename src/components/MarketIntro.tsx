import { useTranslation } from "@/contexts/TranslationContext";

const MarketIntro = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-12 md:py-30 bg-muted/30">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-3xl lg:text-4xl text-orange-500 font-semibold leading-relaxed text-center mb-6">
            {t.marketIntro.title}
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed text-center font-normal">
            {t.marketIntro.description.split(t.marketIntro.earnWell)[0]}
            <span className="text-orange-500 font-semibold">{t.marketIntro.earnWell}</span>
            {t.marketIntro.description.split(t.marketIntro.earnWell)[1].split(t.marketIntro.reorganize)[0]}
            <span className="text-orange-500 font-semibold">{t.marketIntro.reorganize}</span>
            {t.marketIntro.description.split(t.marketIntro.reorganize)[1].split(t.marketIntro.stability)[0]}
            <span className="text-orange-500 font-semibold">{t.marketIntro.stability}</span>
            {t.marketIntro.description.split(t.marketIntro.stability)[1]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketIntro;
