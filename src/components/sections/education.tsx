import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EDUCATION_DATA } from "@/lib/data";
import { Badge } from "../ui/badge";

export function Education() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Education</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My academic background and commitment to lifelong learning in the field of information security.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl justify-center gap-6 py-12 sm:grid-cols-1 md:grid-cols-2 lg:gap-8">
          {EDUCATION_DATA.map((edu) => (
            <Card key={edu.degree} className="flex flex-col text-left p-6 transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0 mb-4 flex-row items-center gap-4">
                 <div className="bg-primary/10 text-primary rounded-full p-3">
                    <edu.icon className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle className="text-xl font-bold font-headline mb-1">{edu.degree}</CardTitle>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Badge variant='secondary'>{edu.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
