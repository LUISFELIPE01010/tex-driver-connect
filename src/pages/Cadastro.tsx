import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/contexts/TranslationContext";
import { supabase } from "@/integrations/supabase/client";

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    temExperiencia: "",
    empresasAnteriores: "",
    tempoTrabalho: "",
    dirigiuForaEstado: "",
    idade: "",
    genero: "",
    temFilhos: "",
    moraSozinho: "",
    workPermit: "",
    problemaSaude: "",
    medicamentosControlados: "",
    disponivelImediato: "",
    dataInicio: "",
    nivelIngles: "",
    altura: "",
    peso: "",
    nomeCompleto: "",
    email: "",
    telefone: "",
    possuiEmpresa: "",
    nomeEmpresa: "",
    einNumber: "",
    nacionalidade: "",
    empregoAtual: "",
    motivacao: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Map form data to database schema
      const { error } = await supabase
        .from('applications')
        .insert({
          nome: formData.nomeCompleto,
          email: formData.email,
          telefone: formData.telefone,
          cidade: '', // Not collected in form
          estado: '', // Not collected in form
          possui_empresa: formData.possuiEmpresa,
          nome_empresa: formData.nomeEmpresa,
          cnpj: formData.einNumber, // Using EIN as CNPJ equivalent
          tipo_cnh: '', // Not collected in form
          experiencia_transporte: formData.temExperiencia,
          disponibilidade_imediata: formData.disponivelImediato,
          tipo_veiculo_interesse: '', // Not collected in form
          observacoes: JSON.stringify({
            empresasAnteriores: formData.empresasAnteriores,
            tempoTrabalho: formData.tempoTrabalho,
            dirigiuForaEstado: formData.dirigiuForaEstado,
            idade: formData.idade,
            genero: formData.genero,
            temFilhos: formData.temFilhos,
            moraSozinho: formData.moraSozinho,
            workPermit: formData.workPermit,
            problemaSaude: formData.problemaSaude,
            medicamentosControlados: formData.medicamentosControlados,
            dataInicio: formData.dataInicio,
            nivelIngles: formData.nivelIngles,
            altura: formData.altura,
            peso: formData.peso,
            nacionalidade: formData.nacionalidade,
            empregoAtual: formData.empregoAtual,
            motivacao: formData.motivacao
          })
        });

      if (error) throw error;

      toast({
        title: t.cadastro.successTitle,
        description: t.cadastro.successDescription,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto p-8 shadow-[var(--card-shadow)]">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            {t.cadastro.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            {t.cadastro.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Experience */}
            <div className="space-y-2">
              <Label className="text-base">{t.cadastro.hasExperience}</Label>
              <RadioGroup value={formData.temExperiencia} onValueChange={(v) => handleChange("temExperiencia", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="exp-sim" />
                  <Label htmlFor="exp-sim">{t.cadastro.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="exp-nao" />
                  <Label htmlFor="exp-nao">{t.cadastro.no}</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.temExperiencia === "sim" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="empresas">{t.cadastro.companies}</Label>
                  <Input 
                    id="empresas" 
                    value={formData.empresasAnteriores}
                    onChange={(e) => handleChange("empresasAnteriores", e.target.value)}
                    placeholder={t.cadastro.companiesPlaceholder}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempo">{t.cadastro.workTime}</Label>
                  <Input 
                    id="tempo" 
                    value={formData.tempoTrabalho}
                    onChange={(e) => handleChange("tempoTrabalho", e.target.value)}
                    placeholder={t.cadastro.workTimePlaceholder}
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label className="text-base">{t.cadastro.droveOutside}</Label>
              <RadioGroup value={formData.dirigiuForaEstado} onValueChange={(v) => handleChange("dirigiuForaEstado", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="estado-sim" />
                  <Label htmlFor="estado-sim">{t.cadastro.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="estado-nao" />
                  <Label htmlFor="estado-nao">{t.cadastro.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idade">{t.cadastro.age}</Label>
              <Input 
                id="idade" 
                type="number"
                value={formData.idade}
                onChange={(e) => handleChange("idade", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genero">{t.cadastro.gender}</Label>
              <Select value={formData.genero} onValueChange={(v) => handleChange("genero", v)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.cadastro.selectGender} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">{t.cadastro.male}</SelectItem>
                  <SelectItem value="feminino">{t.cadastro.female}</SelectItem>
                  <SelectItem value="outro">{t.cadastro.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base">{t.cadastro.hasChildren}</Label>
              <RadioGroup value={formData.temFilhos} onValueChange={(v) => handleChange("temFilhos", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="filhos-sim" />
                  <Label htmlFor="filhos-sim">{t.cadastro.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="filhos-nao" />
                  <Label htmlFor="filhos-nao">{t.cadastro.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-base">{t.cadastro.livesAlone}</Label>
              <RadioGroup value={formData.moraSozinho} onValueChange={(v) => handleChange("moraSozinho", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="sozinho-sim" />
                  <Label htmlFor="sozinho-sim">{t.cadastro.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="sozinho-nao" />
                  <Label htmlFor="sozinho-nao">{t.cadastro.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workPermit">{t.cadastro.workPermit}</Label>
              <Select value={formData.workPermit} onValueChange={(v) => handleChange("workPermit", v)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.cadastro.selectGender} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work-permit">{t.cadastro.workPermitOption}</SelectItem>
                  <SelectItem value="green-card">{t.cadastro.greenCard}</SelectItem>
                  <SelectItem value="cidadao">{t.cadastro.citizen}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="saude">{t.cadastro.healthIssue}</Label>
              <Input 
                id="saude" 
                value={formData.problemaSaude}
                onChange={(e) => handleChange("problemaSaude", e.target.value)}
                placeholder={t.cadastro.healthPlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">{t.cadastro.controlledMeds}</Label>
              <RadioGroup value={formData.medicamentosControlados} onValueChange={(v) => handleChange("medicamentosControlados", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="med-sim" />
                  <Label htmlFor="med-sim">{t.cadastro.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="med-nao" />
                  <Label htmlFor="med-nao">{t.cadastro.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-base">{t.cadastro.availableNow}</Label>
              <RadioGroup value={formData.disponivelImediato} onValueChange={(v) => handleChange("disponivelImediato", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="disp-sim" />
                  <Label htmlFor="disp-sim">{t.cadastro.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="disp-nao" />
                  <Label htmlFor="disp-nao">{t.cadastro.no}</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.disponivelImediato === "nao" && (
              <div className="space-y-2">
                <Label htmlFor="dataInicio">{t.cadastro.startDate}</Label>
                <Input 
                  id="dataInicio" 
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => handleChange("dataInicio", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="ingles">{t.cadastro.englishLevel}</Label>
              <Select value={formData.nivelIngles} onValueChange={(v) => handleChange("nivelIngles", v)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.cadastro.selectGender} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fluente">{t.cadastro.fluent}</SelectItem>
                  <SelectItem value="intermediario">{t.cadastro.intermediate}</SelectItem>
                  <SelectItem value="basico">{t.cadastro.basic}</SelectItem>
                  <SelectItem value="nao-fala">{t.cadastro.noEnglish}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="altura">{t.cadastro.height}</Label>
                <Input 
                  id="altura" 
                  type="number"
                  value={formData.altura}
                  onChange={(e) => handleChange("altura", e.target.value)}
                  placeholder="175"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso">{t.cadastro.weight}</Label>
                <Input 
                  id="peso" 
                  type="number"
                  value={formData.peso}
                  onChange={(e) => handleChange("peso", e.target.value)}
                  placeholder="70"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">{t.cadastro.fullName}</Label>
              <Input 
                id="nome" 
                required
                value={formData.nomeCompleto}
                onChange={(e) => handleChange("nomeCompleto", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.cadastro.email}</Label>
              <Input 
                id="email" 
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">{t.cadastro.phone}</Label>
              <Input 
                id="telefone" 
                type="tel"
                required
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">{t.cadastro.hasCompany}</Label>
              <RadioGroup value={formData.possuiEmpresa} onValueChange={(v) => handleChange("possuiEmpresa", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="empresa-sim" />
                  <Label htmlFor="empresa-sim">{t.cadastro.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="empresa-nao" />
                  <Label htmlFor="empresa-nao">{t.cadastro.no}</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.possuiEmpresa === "sim" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeEmpresa">{t.cadastro.companyName}</Label>
                  <Input 
                    id="nomeEmpresa" 
                    value={formData.nomeEmpresa}
                    onChange={(e) => handleChange("nomeEmpresa", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ein">{t.cadastro.einNumber}</Label>
                  <Input 
                    id="ein" 
                    value={formData.einNumber}
                    onChange={(e) => handleChange("einNumber", e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="nacionalidade">{t.cadastro.nationality}</Label>
              <Input 
                id="nacionalidade" 
                value={formData.nacionalidade}
                onChange={(e) => handleChange("nacionalidade", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">{t.cadastro.currentlyEmployed}</Label>
              <RadioGroup value={formData.empregoAtual} onValueChange={(v) => handleChange("empregoAtual", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="emprego-sim" />
                  <Label htmlFor="emprego-sim">{t.cadastro.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="emprego-nao" />
                  <Label htmlFor="emprego-nao">{t.cadastro.no}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivacao">{t.cadastro.motivation}</Label>
              <Textarea 
                id="motivacao" 
                value={formData.motivacao}
                onChange={(e) => handleChange("motivacao", e.target.value)}
                rows={4}
                placeholder={t.cadastro.motivationPlaceholder}
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              {t.cadastro.submit}
            </Button>
          </form>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Cadastro;
