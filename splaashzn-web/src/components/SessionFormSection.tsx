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
import {
  PasswordInput,
  PasswordInputStrengthChecker,
} from "@/components/ui/password-input";
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
                    <Input
                      id="ta bs-demo-name"
                      defaultValue=""
                      placeholder="Email"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">Password</Label>
                    <PasswordInput placeholder="Password">
                      <PasswordInputStrengthChecker />
                    </PasswordInput>
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
                  <div className="flex gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">Name</Label>
                      <Input
                        id="tabs-demo-current"
                        className="w-[95%] py-2"
                        placeholder="Name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">First Surname</Label>
                      <Input
                        id="tabs-demo-current"
                        className="w-[100%]"
                        placeholder="First Surname"
                      />
                    </div>
                    <div className="grid gap-2 ml-5">
                      <Label htmlFor="tabs-demo-current">Second Surname</Label>
                      <Input
                        id="tabs-demo-current"
                        className="w-[100%]"
                        placeholder="Second Surname"
                      />
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="grid gap-2 mb-10">
                      <Label htmlFor="tabs-demo-current">Email</Label>
                      <Input
                        id="tabs-demo-current"
                        type="email"
                        className="w-[105%] py-2"
                        placeholder="Email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">Password</Label>
                      <PasswordInput placeholder="Password">
                        <PasswordInputStrengthChecker />
                      </PasswordInput>
                      {/* <Input
                        id="tabs-demo-current"
                        type="password"
                        className="w-[105%]"
                      /> */}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tabs-demo-current">Repeat Password</Label>
                      <PasswordInput placeholder="Repeat Password">
                        <PasswordInputStrengthChecker />
                      </PasswordInput>
                      {/* <Input
                        id="tabs-demo-current"
                        type="password"
                        className="w-[105%]"
                      /> */}
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
      </DialogContent>
    </Dialog>
  );
}
