import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LogOut, Trash2, Download, Calendar, User as UserIcon, Mail, Phone, Building, Globe, Filter } from "lucide-react";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/contexts/TranslationContext";

const AdminRespostas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin role when session changes
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadApplications();
    }
  }, [isAdmin, dateFilter]);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin role:', error);
      }

      setIsAdmin(!!data);
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async () => {
    setLoadingData(true);
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
        title: t.admin.deleteError.replace('aplicações', 'aplicações'),
        description: t.admin.deleteError,
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
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
        title: t.admin.noSelection,
        description: t.admin.noSelectionDescription,
        variant: "destructive",
      });
      return;
    }

    const confirmed = window.confirm(`${t.admin.deleteConfirm} ${selectedIds.length} ${t.admin.applications}`);
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
          title: t.admin.exportSuccess,
          description: `${selectedIds.length} ${t.admin.deleteSuccess}`,
        });
      } catch (error) {
        console.error('Error deleting applications:', error);
        toast({
          title: t.admin.deleteError.split('.')[0],
          description: t.admin.deleteError,
          variant: "destructive",
        });
      }
    }
  };

  const handleExportToExcel = () => {
    if (applications.length === 0) {
      toast({
        title: t.admin.noData,
        description: t.admin.noDataDescription,
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
      title: t.admin.exportSuccess,
      description: t.admin.exportDescription,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">{t.admin.verifyingAuth}</p>
        </Card>
      </div>
    );
  }

  if (!user || !isAdmin) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">{t.admin.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.admin.filterAll}</SelectItem>
                <SelectItem value="today">{t.admin.filterToday}</SelectItem>
                <SelectItem value="week">{t.admin.filterWeek}</SelectItem>
                <SelectItem value="month">{t.admin.filterMonth}</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleDeleteSelected} 
              variant="destructive"
              disabled={selectedIds.length === 0 || loadingData}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t.admin.deleteSelected} ({selectedIds.length})
            </Button>
            <Button onClick={handleExportToExcel} variant="outline" disabled={loadingData}>
              <Download className="mr-2 h-4 w-4" />
              {t.admin.exportExcel}
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              {t.admin.logout}
            </Button>
          </div>
        </div>

        {loadingData ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">{t.admin.loading}</p>
          </Card>
        ) : applications.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">{t.admin.noApplications}</p>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Checkbox
                checked={selectedIds.length === applications.length && applications.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-muted-foreground">
                {t.admin.selectAll} ({applications.length})
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
                        <Badge variant="default">{t.admin.availableImmediate}</Badge>
                      )}
                      {app.temExperiencia === "sim" && (
                        <Badge variant="secondary">{t.admin.withExperience}</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Informações de Contato */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      {t.admin.contactInfo}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t.admin.email}:</span>
                        <p className="font-medium">{app.email || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.phone}:</span>
                        <p className="font-medium">{app.telefone || t.admin.notInformed}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Dados Pessoais */}
                  <div>
                    <h4 className="font-semibold mb-3">{t.admin.personalData}</h4>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t.admin.age}:</span>
                        <p className="font-medium">{app.idade ? `${app.idade} ${t.admin.years}` : t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.gender}:</span>
                        <p className="font-medium capitalize">{app.genero || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.nationality}:</span>
                        <p className="font-medium">{app.nacionalidade || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.height}:</span>
                        <p className="font-medium">{app.altura ? `${app.altura} cm` : t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.weight}:</span>
                        <p className="font-medium">{app.peso ? `${app.peso} kg` : t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.hasChildren}:</span>
                        <p className="font-medium capitalize">{app.temFilhos || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.liveAlone}:</span>
                        <p className="font-medium capitalize">{app.moraSozinho || t.admin.notInformed}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Experiência Profissional */}
                  <div>
                    <h4 className="font-semibold mb-3">{t.admin.professionalExperience}</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t.admin.experience}:</span>
                        <p className="font-medium capitalize">{app.temExperiencia || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.previousCompanies}:</span>
                        <p className="font-medium">{app.empresasAnteriores || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.workTime}:</span>
                        <p className="font-medium">{app.tempoTrabalho || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.droveOutside}:</span>
                        <p className="font-medium capitalize">{app.dirigiuForaEstado || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.currentlyEmployed}:</span>
                        <p className="font-medium capitalize">{app.empregoAtual || t.admin.notInformed}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Documentação e Idiomas */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {t.admin.documentation}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t.admin.legalStatus}:</span>
                        <p className="font-medium capitalize">{app.workPermit?.replace('-', ' ') || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.englishLevel}:</span>
                        <p className="font-medium capitalize">{app.nivelIngles || t.admin.notInformed}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Empresa */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {t.admin.companyInfo}
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t.admin.hasCompany}:</span>
                        <p className="font-medium capitalize">{app.possuiEmpresa || t.admin.notInformed}</p>
                      </div>
                      {app.possuiEmpresa === "sim" && (
                        <>
                          <div>
                            <span className="text-muted-foreground">{t.admin.companyName}:</span>
                            <p className="font-medium">{app.nomeEmpresa || t.admin.notInformed}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{t.admin.einNumber}:</span>
                            <p className="font-medium">{app.einNumber || t.admin.notInformed}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Saúde */}
                  <div>
                    <h4 className="font-semibold mb-3">{t.admin.health}</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t.admin.healthIssues}:</span>
                        <p className="font-medium">{app.problemaSaude || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.controlledMedication}:</span>
                        <p className="font-medium capitalize">{app.medicamentosControlados || t.admin.notInformed}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Disponibilidade */}
                  <div>
                    <h4 className="font-semibold mb-3">{t.admin.availability}</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t.admin.immediateAvailability}:</span>
                        <p className="font-medium capitalize">{app.disponivelImediato || t.admin.notInformed}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t.admin.startDate}:</span>
                        <p className="font-medium">
                          {app.dataInicio ? new Date(app.dataInicio).toLocaleDateString('pt-BR') : t.admin.notInformed}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Motivação */}
                  <div>
                    <h4 className="font-semibold mb-3">{t.admin.motivation}</h4>
                    <p className="text-sm leading-relaxed">{app.motivacao || t.admin.notInformed}</p>
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
