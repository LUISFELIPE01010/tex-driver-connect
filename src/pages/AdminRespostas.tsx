import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut } from "lucide-react";

const AdminRespostas = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
      loadApplications();
    }
  }, []);

  const loadApplications = () => {
    const data = JSON.parse(localStorage.getItem("tex_applications") || "[]");
    setApplications(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper authentication)
    if (password === "tex2024admin") {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Aplicações Recebidas</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Experiência</TableHead>
                <TableHead>Inglês</TableHead>
                <TableHead>Disponível</TableHead>
                <TableHead>Motivação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    Nenhuma aplicação recebida ainda
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(app.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{app.nomeCompleto}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.telefone}</TableCell>
                    <TableCell>{app.idade}</TableCell>
                    <TableCell>{app.temExperiencia}</TableCell>
                    <TableCell>{app.nivelIngles}</TableCell>
                    <TableCell>{app.disponivelImediato}</TableCell>
                    <TableCell className="max-w-xs truncate">{app.motivacao}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default AdminRespostas;
