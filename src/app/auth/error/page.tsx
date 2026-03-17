import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AuthErrorPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <h1 className="text-xl font-bold">Authentication Error</h1>
          <p className="text-sm text-muted-foreground">
            Something went wrong during sign in. Please try again.
          </p>
          <div className="flex gap-2">
            <Link href="/auth/login">
              <Button>Try Again</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Go Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
