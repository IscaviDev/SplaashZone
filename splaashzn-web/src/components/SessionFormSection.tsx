import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppWindowIcon, CodeIcon } from "lucide-react";

// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SessionFormSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function SessionFormSection({
  isOpen,
  onOpenChange,
}: SessionFormSectionProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-3xl flex items-center justify-center max-h-[700px]">
        <div className="flex w-full max-w-2xl flex-col gap-6">
          <Tabs defaultValue="account">
            <TabsList className="flex items-center justify-center w-full">
              <TabsTrigger value="login" className="cursor-pointer">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="getStarted" className="cursor-pointer">
                Get Started
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-center items-center">
                    Sign In
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-name">Username</Label>
                    <Input id="tabs-demo-name" defaultValue="" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Password</Label>
                    <Input
                      id="tabs-demo-username"
                      type="password"
                      defaultValue=""
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <Button className="w-full cursor-pointer">Sign In</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="getStarted">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-center items-center">
                    Create Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex gap-10">
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">Name</Label>
                      <Input id="tabs-demo-current" className="w-[105%] py-2" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">First Surname</Label>
                      <Input id="tabs-demo-current" className="w-[105%]" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">Second Surname</Label>
                      <Input id="tabs-demo-current" className="w-[105%]" />
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">Email</Label>
                      <Input
                        id="tabs-demo-current"
                        type="email"
                        className="w-[105%] py-2"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">Password</Label>
                      <Input
                        id="tabs-demo-current"
                        type="password"
                        className="w-[105%]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">Repeat Password</Label>
                      <Input
                        id="tabs-demo-current"
                        type="password"
                        className="w-[105%]"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <Button className="w-[100%] cursor-pointer">Sign Up</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card> */}
      </DialogContent>
    </Dialog>
  );
}
