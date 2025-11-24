-- Create applications table to store form submissions
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  possui_empresa TEXT NOT NULL,
  nome_empresa TEXT,
  cnpj TEXT,
  tipo_cnh TEXT NOT NULL,
  experiencia_transporte TEXT NOT NULL,
  disponibilidade_imediata TEXT NOT NULL,
  tipo_veiculo_interesse TEXT NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for the public form)
CREATE POLICY "Anyone can submit applications"
ON public.applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create policy to allow reading all applications (will be secured with app-level auth for now)
CREATE POLICY "Anyone can view applications"
ON public.applications
FOR SELECT
TO anon, authenticated
USING (true);

-- Create index on created_at for sorting
CREATE INDEX idx_applications_created_at ON public.applications(created_at DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_applications_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.update_applications_updated_at();