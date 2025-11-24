import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Shield, CheckCircle2 } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type LoginResponse } from "@shared/schema";
import heroImage from "@assets/generated_images/professional_workspace_hero_image.png";

const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      try {
        const response = await apiRequest(
          "POST",
          "/api/login",
          { email: data.email, password: data.password }
        );
        const jsonData: LoginResponse = await response.json();
        
        if (!jsonData.success) {
          throw new Error(jsonData.message);
        }
        
        return jsonData;
      } catch (error: any) {
        // Parse error message from apiRequest to get the JSON body
        if (error.message) {
          // Extract JSON from error message like "401: {success:false,...}"
          const match = error.message.match(/\d+:\s*({.*})/);
          if (match) {
            try {
              const errorData: LoginResponse = JSON.parse(match[1]);
              throw new Error(errorData.message);
            } catch {
              // If parsing fails, throw original error
            }
          }
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      setLoginSuccess(true);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo de volta, ${data.user?.username}`,
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        setLoginSuccess(false);
      }, 2000);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.message || "Email ou senha incorretos. Tente novamente.",
      });
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight" data-testid="text-heading">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="text-subheading">
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-lg"
              data-testid="button-google-login"
            >
              <SiGoogle className="h-5 w-5 mr-2" />
              <span className="text-base">Continuar com Google</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground" data-testid="text-divider">
                Ou continue com email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="seu@email.com"
                          className="h-12 pl-11 rounded-lg"
                          disabled={loginMutation.isPending}
                          data-testid="input-email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-12 pl-11 pr-11 rounded-lg"
                          disabled={loginMutation.isPending}
                          data-testid="input-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                          data-testid="button-toggle-password"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={loginMutation.isPending}
                          data-testid="checkbox-remember"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        Lembrar de mim
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                  data-testid="link-forgot-password"
                >
                  Esqueceu a senha?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold rounded-lg"
                disabled={loginMutation.isPending || loginSuccess}
                data-testid="button-submit"
              >
                {loginSuccess ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Sucesso!
                  </span>
                ) : loginMutation.isPending ? (
                  "Entrando..."
                ) : (
                  "Entrar"
                )}
              </Button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground" data-testid="text-security-badge">
                <Shield className="h-3 w-3" />
                <span>Conexão segura e criptografada</span>
              </div>
            </form>
          </Form>

          {/* Create Account Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Novo por aqui?{" "}
              <a
                href="#"
                className="font-medium text-primary hover:underline"
                data-testid="link-create-account"
              >
                Criar uma nova conta
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Brand Panel (Desktop Only) */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          data-testid="img-hero-background"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-8 lg:p-12 text-white">
          <div className="max-w-lg space-y-6">
            <h2 className="text-4xl font-bold leading-tight drop-shadow-md" data-testid="text-hero-heading">
              Simplifique seu trabalho
            </h2>
            <p className="text-lg drop-shadow-sm" data-testid="text-hero-description">
              Acesse sua área de trabalho com segurança e produtividade. 
              Gerencie tudo em um só lugar com nossa plataforma moderna e intuitiva.
            </p>
            
            {/* Feature Highlights */}
            <div className="grid gap-4 pt-8">
              <div className="flex items-start gap-3 text-left" data-testid="feature-security">
                <div className="bg-white/15 p-2 rounded-md backdrop-blur-sm">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 drop-shadow-sm">Segurança Avançada</h3>
                  <p className="text-sm drop-shadow-sm opacity-95">
                    Proteção completa com criptografia de ponta a ponta
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left" data-testid="feature-access">
                <div className="bg-white/15 p-2 rounded-md backdrop-blur-sm">
                  <Lock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 drop-shadow-sm">Acesso Rápido</h3>
                  <p className="text-sm drop-shadow-sm opacity-95">
                    Entre em segundos e comece a trabalhar imediatamente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
