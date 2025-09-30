import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Google</title>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.54-.88 2.86-1.9 3.8L21.48 21c2.44-2.22 3.84-5.48 3.84-9.18 0-.56-.04-1.12-.12-1.68H12.48zM2.84 12.18c0-1.6.6-3.06 1.6-4.14L1.24 4.9C.36 6.62 0 8.7 0 11.04s.36 4.42 1.24 6.14l3.2-2.82c-1-1.1-1.6-2.54-1.6-4.14z" fill="#EA4335" />
    <path d="M12.48 4.38c1.72 0 3.22.62 4.42 1.78l2.84-2.78C17.98 1.62 15.6.86 12.48.86c-3.9 0-7.2 2.22-9.24 5.52l3.2 2.82C7.32 6.56 9.64 4.38 12.48 4.38z" fill="#4285F4" />
    <path d="M4.44 14.98c-1-1.1-1.6-2.54-1.6-4.14s.6-3.06 1.6-4.14l-3.2-2.82C.36 5.52 0 7.6 0 9.94s.36 4.42 1.24 6.14l3.2-2.82z" fill="#FBBC05" />
    <path d="M12.48 18.42c2.84 0 5.16-1.2 6.84-3.18l-2.84-2.78c-.96.64-2.2 1.04-3.98 1.04-2.86 0-5.14-2.18-6.04-5.04l-3.2 2.82c2.04 3.3 5.34 5.52 9.24 5.52z" fill="#34A853" />
  </svg>
);

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Metro<span className="text-primary">Flow</span>
          </CardTitle>
          <CardDescription>
            Sign in to access the Train Induction Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="user@metroflow.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Link href="/dashboard" passHref>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
