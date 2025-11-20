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

const Cadastro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store in localStorage (in production, this would go to a backend)
    const applications = JSON.parse(localStorage.getItem("tex_applications") || "[]");
    applications.push({
      ...formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("tex_applications", JSON.stringify(applications));

    toast({
      title: "Aplicação enviada com sucesso! ✅",
      description: "Entraremos em contato em breve.",
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
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
            Verifique se você se encaixa no perfil
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            para trabalhar com a TEX Transportes
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Experience */}
            <div className="space-y-2">
              <Label className="text-base">Tem experiência como driver profissional (não Uber)?</Label>
              <RadioGroup value={formData.temExperiencia} onValueChange={(v) => handleChange("temExperiencia", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="exp-sim" />
                  <Label htmlFor="exp-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="exp-nao" />
                  <Label htmlFor="exp-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.temExperiencia === "sim" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="empresas">Cite até 2 empresas onde já trabalhou</Label>
                  <Input 
                    id="empresas" 
                    value={formData.empresasAnteriores}
                    onChange={(e) => handleChange("empresasAnteriores", e.target.value)}
                    placeholder="Empresa 1, Empresa 2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempo">Quanto tempo trabalhou em cada uma?</Label>
                  <Input 
                    id="tempo" 
                    value={formData.tempoTrabalho}
                    onChange={(e) => handleChange("tempoTrabalho", e.target.value)}
                    placeholder="Ex: 2 anos, 1 ano"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label className="text-base">Já dirigiu fora do estado antes?</Label>
              <RadioGroup value={formData.dirigiuForaEstado} onValueChange={(v) => handleChange("dirigiuForaEstado", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="estado-sim" />
                  <Label htmlFor="estado-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="estado-nao" />
                  <Label htmlFor="estado-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idade">Quantos anos você tem?</Label>
              <Input 
                id="idade" 
                type="number"
                value={formData.idade}
                onChange={(e) => handleChange("idade", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genero">Gênero</Label>
              <Select value={formData.genero} onValueChange={(v) => handleChange("genero", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Tem filhos?</Label>
              <RadioGroup value={formData.temFilhos} onValueChange={(v) => handleChange("temFilhos", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="filhos-sim" />
                  <Label htmlFor="filhos-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="filhos-nao" />
                  <Label htmlFor="filhos-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Mora sozinho?</Label>
              <RadioGroup value={formData.moraSozinho} onValueChange={(v) => handleChange("moraSozinho", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="sozinho-sim" />
                  <Label htmlFor="sozinho-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="sozinho-nao" />
                  <Label htmlFor="sozinho-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workPermit">Possui Work Permit, Green Card ou é cidadão?</Label>
              <Select value={formData.workPermit} onValueChange={(v) => handleChange("workPermit", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work-permit">Work Permit</SelectItem>
                  <SelectItem value="green-card">Green Card</SelectItem>
                  <SelectItem value="cidadao">Cidadão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="saude">Tem algum problema de saúde? Se sim, qual?</Label>
              <Input 
                id="saude" 
                value={formData.problemaSaude}
                onChange={(e) => handleChange("problemaSaude", e.target.value)}
                placeholder="Não / Especifique"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">Usa medicamentos controlados?</Label>
              <RadioGroup value={formData.medicamentosControlados} onValueChange={(v) => handleChange("medicamentosControlados", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="med-sim" />
                  <Label htmlFor="med-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="med-nao" />
                  <Label htmlFor="med-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Está disponível para começar imediatamente?</Label>
              <RadioGroup value={formData.disponivelImediato} onValueChange={(v) => handleChange("disponivelImediato", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="disp-sim" />
                  <Label htmlFor="disp-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="disp-nao" />
                  <Label htmlFor="disp-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.disponivelImediato === "nao" && (
              <div className="space-y-2">
                <Label htmlFor="dataInicio">Quando poderia começar?</Label>
                <Input 
                  id="dataInicio" 
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => handleChange("dataInicio", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="ingles">Fala inglês fluente? Qual o seu nível?</Label>
              <Select value={formData.nivelIngles} onValueChange={(v) => handleChange("nivelIngles", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fluente">Fluente</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="basico">Básico</SelectItem>
                  <SelectItem value="nao-fala">Não fala</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="altura">Altura (cm)</Label>
                <Input 
                  id="altura" 
                  type="number"
                  value={formData.altura}
                  onChange={(e) => handleChange("altura", e.target.value)}
                  placeholder="175"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
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
              <Label htmlFor="nome">Nome completo *</Label>
              <Input 
                id="nome" 
                required
                value={formData.nomeCompleto}
                onChange={(e) => handleChange("nomeCompleto", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input 
                id="email" 
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input 
                id="telefone" 
                type="tel"
                required
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">Possui empresa aberta?</Label>
              <RadioGroup value={formData.possuiEmpresa} onValueChange={(v) => handleChange("possuiEmpresa", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="empresa-sim" />
                  <Label htmlFor="empresa-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="empresa-nao" />
                  <Label htmlFor="empresa-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.possuiEmpresa === "sim" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeEmpresa">Nome da empresa</Label>
                  <Input 
                    id="nomeEmpresa" 
                    value={formData.nomeEmpresa}
                    onChange={(e) => handleChange("nomeEmpresa", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ein">EIN Number</Label>
                  <Input 
                    id="ein" 
                    value={formData.einNumber}
                    onChange={(e) => handleChange("einNumber", e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="nacionalidade">Nacionalidade</Label>
              <Input 
                id="nacionalidade" 
                value={formData.nacionalidade}
                onChange={(e) => handleChange("nacionalidade", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base">Está empregado atualmente?</Label>
              <RadioGroup value={formData.empregoAtual} onValueChange={(v) => handleChange("empregoAtual", v)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="emprego-sim" />
                  <Label htmlFor="emprego-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="emprego-nao" />
                  <Label htmlFor="emprego-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivacao">Por que você quer trabalhar com cargovan? Conte brevemente seu interesse.</Label>
              <Textarea 
                id="motivacao" 
                value={formData.motivacao}
                onChange={(e) => handleChange("motivacao", e.target.value)}
                rows={4}
                placeholder="Descreva sua motivação..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Enviar minha aplicação
            </Button>
          </form>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Cadastro;
