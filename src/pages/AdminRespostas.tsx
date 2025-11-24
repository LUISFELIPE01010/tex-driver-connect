import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LogOut, Trash2, Download, Calendar, User, Mail, Phone, Building, Globe, Filter } from "lucide-react";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminRespostas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
      loadApplications();
    }
  }, [dateFilter]);

  const loadApplications = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply date filter
      if (dateFilter !== "all") {
        const now = new Date();
        let startDate: Date;

        switch (dateFilter) {
          case "today":
            startDate = new Date(now.setHours(0, 0, 0, 0));
            break;
          case "week":
            startDate = new Date(now.setDate(now.getDate() - 7));
            break;
          case "month":
            startDate = new Date(now.setMonth(now.getMonth() - 1));
            break;
          default:
            startDate = new Date(0);
        }

        query = query.gte('created_at', startDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      // Parse observacoes JSON field back into individual fields
      const parsedData = data?.map(app => {
        try {
          const observacoes = typeof app.observacoes === 'string' 
            ? JSON.parse(app.observacoes) 
            : app.observacoes || {};
          
          return {
            ...app,
            ...observacoes,
            nomeCompleto: app.nome,
            timestamp: app.created_at
          };
        } catch (e) {
          return {
            ...app,
            nomeCompleto: app.nome,
            timestamp: app.created_at
          };
        }
      }) || [];

      setApplications(parsedData);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar aplicações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "tex2025admin") {
      sessionStorage.setItem("admin_auth", "authenticated");
      setIsAuthenticated(true);
      loadApplications();
    } else {
      alert("Senha incorreta");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(applications.map(app => app.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      toast({
        title: "Nenhuma seleção",
        description: "Selecione pelo menos uma aplicação para excluir.",
        variant: "destructive",
      });
      return;
    }

    const confirmed = window.confirm(`Deseja excluir ${selectedIds.length} aplicação(ões)?`);
    if (confirmed) {
      try {
        const { error } = await supabase
          .from('applications')
          .delete()
          .in('id', selectedIds);

        if (error) throw error;

        setSelectedIds([]);
        loadApplications();
        toast({
          title: "Sucesso",
          description: `${selectedIds.length} aplicação(ões) excluída(s).`,
        });
      } catch (error) {
        console.error('Error deleting applications:', error);
        toast({
          title: "Erro",
          description: "Erro ao excluir aplicações.",
          variant: "destructive",
        });
      }
    }
  };

  const handleExportToExcel = () => {
    if (applications.length === 0) {
      toast({
        title: "Nenhum dado",
        description: "Não há aplicações para exportar.",
        variant: "destructive",
      });
      return;
    }

    const exportData = applications.map(app => ({
      Data: new Date(app.timestamp).toLocaleDateString(),
      Nome: app.nomeCompleto,
      Email: app.email,
      Telefone: app.telefone,
      Idade: app.idade,
      Gênero: app.genero,
      Nacionalidade: app.nacionalidade,
      "Tem Experiência": app.temExperiencia,
      "Empresas Anteriores": app.empresasAnteriores,
      "Tempo de Trabalho": app.tempoTrabalho,
      "Dirigiu Fora do Estado": app.dirigiuForaEstado,
      "Tem Filhos": app.temFilhos,
      "Mora Sozinho": app.moraSozinho,
      "Work Permit": app.workPermit,
      "Problema de Saúde": app.problemaSaude,
      "Medicamentos Controlados": app.medicamentosControlados,
      "Disponível Imediato": app.disponivelImediato,
      "Data de Início": app.dataInicio,
      "Nível de Inglês": app.nivelIngles,
      "Altura (cm)": app.altura,
      "Peso (kg)": app.peso,
      "Possui Empresa": app.possuiEmpresa,
      "Nome da Empresa": app.nomeEmpresa,
      "EIN Number": app.einNumber,
      "Emprego Atual": app.empregoAtual,
      Motivação: app.motivacao,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Aplicações");
    XLSX.writeFile(workbook, `tex_aplicacoes_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Exportado com sucesso",
      description: "O arquivo Excel foi baixado.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Área Administrativa</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Aplicações Recebidas</h1>
          <div className="flex flex-wrap gap-2">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleDeleteSelected} 
              variant="destructive"
              disabled={selectedIds.length === 0 || loading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Selecionados ({selectedIds.length})
            </Button>
            <Button onClick={handleExportToExcel} variant="outline" disabled={loading}>
              <Download className="mr-2 h-4 w-4" />
              Exportar Excel
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {loading ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Carregando...</p>
          </Card>
        ) : applications.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Nenhuma aplicação encontrada</p>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Checkbox
                checked={selectedIds.length === applications.length && applications.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-muted-foreground">
                Selecionar todos ({applications.length})
              </span>
            </div>

            {applications.map((app) => (
              <Card key={app.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedIds.includes(app.id)}
                        onCheckedChange={(checked) => handleSelectOne(app.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div>
                        <CardTitle className="text-xl">{app.nomeCompleto}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(app.timestamp).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {app.disponivelImediato === "sim" && (
                        <Badge variant="default">Disponível Imediato</Badge>
                      )}
                      {app.temExperiencia === "sim" && (
                        <Badge variant="secondary">Com Experiência</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Informações de Contato */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Informações de Contato
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <p className="font-medium">{app.email || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Telefone:</span>
                        <p className="font-medium">{app.telefone || "Não informado"}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Dados Pessoais */}
                  <div>
                    <h4 className="font-semibold mb-3">Dados Pessoais</h4>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Idade:</span>
                        <p className="font-medium">{app.idade ? `${app.idade} anos` : "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gênero:</span>
                        <p className="font-medium capitalize">{app.genero || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Nacionalidade:</span>
                        <p className="font-medium">{app.nacionalidade || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Altura:</span>
                        <p className="font-medium">{app.altura ? `${app.altura} cm` : "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Peso:</span>
                        <p className="font-medium">{app.peso ? `${app.peso} kg` : "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tem Filhos:</span>
                        <p className="font-medium capitalize">{app.temFilhos || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mora Sozinho:</span>
                        <p className="font-medium capitalize">{app.moraSozinho || "Não informado"}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Experiência Profissional */}
                  <div>
                    <h4 className="font-semibold mb-3">Experiência Profissional</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Experiência como driver profissional (não Uber):</span>
                        <p className="font-medium capitalize">{app.temExperiencia || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Empresas anteriores:</span>
                        <p className="font-medium">{app.empresasAnteriores || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tempo de trabalho em cada empresa:</span>
                        <p className="font-medium">{app.tempoTrabalho || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Já dirigiu fora do estado:</span>
                        <p className="font-medium capitalize">{app.dirigiuForaEstado || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Está empregado atualmente:</span>
                        <p className="font-medium capitalize">{app.empregoAtual || "Não informado"}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Documentação e Idiomas */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Documentação e Idiomas
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Status Legal (Work Permit/Green Card/Cidadão):</span>
                        <p className="font-medium capitalize">{app.workPermit?.replace('-', ' ') || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Nível de Inglês:</span>
                        <p className="font-medium capitalize">{app.nivelIngles || "Não informado"}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Empresa */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Informações de Empresa
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Possui empresa aberta:</span>
                        <p className="font-medium capitalize">{app.possuiEmpresa || "Não informado"}</p>
                      </div>
                      {app.possuiEmpresa === "sim" && (
                        <>
                          <div>
                            <span className="text-muted-foreground">Nome da empresa:</span>
                            <p className="font-medium">{app.nomeEmpresa || "Não informado"}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">EIN Number:</span>
                            <p className="font-medium">{app.einNumber || "Não informado"}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Saúde */}
                  <div>
                    <h4 className="font-semibold mb-3">Informações de Saúde</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Problema de saúde:</span>
                        <p className="font-medium">{app.problemaSaude || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Usa medicamentos controlados:</span>
                        <p className="font-medium capitalize">{app.medicamentosControlados || "Não informado"}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Disponibilidade */}
                  <div>
                    <h4 className="font-semibold mb-3">Disponibilidade</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Disponível para começar imediatamente:</span>
                        <p className="font-medium capitalize">{app.disponivelImediato || "Não informado"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Data de início pretendida:</span>
                        <p className="font-medium">
                          {app.dataInicio ? new Date(app.dataInicio).toLocaleDateString('pt-BR') : "Não informado"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Motivação */}
                  <div>
                    <h4 className="font-semibold mb-3">Motivação</h4>
                    <p className="text-sm leading-relaxed">{app.motivacao || "Não informado"}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRespostas;
