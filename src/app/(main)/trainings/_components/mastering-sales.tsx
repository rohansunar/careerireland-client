import { ArrowRight, BookOpen, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MasteringSales() {
  return (
    <section className="py-12  px-2" id="mastering-the-art-of-selling">
      <div className=" mx-auto max-w-5xl md:container">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
          Mastering the Art of Selling
        </h2>

        <Card className="border-2 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl md:text-2xl">
              Nirvan {"Kashyap's"} Mastering the Art of Selling
            </CardTitle>
            <CardDescription className="text-base mt-2">
              A comprehensive and practical course that covers the entire B2B
              sales cycle, from prospecting to closing deals.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-base leading-relaxed">
              <p>
                This course thoroughly explains fundamental sales concepts such
                as the sales pipeline, process, funnel, projection, prospecting,
                touchpoints, negotiation, closure, and appointment setting. The
                course stands out for its structured approach, breaking down key
                topics into logical sections for easy reference. With actionable
                strategies, scripts, and best practices, it provides a practical
                roadmap for understanding customer needs, delivering value, and
                building trust, making it an essential guide for mastering B2B
                sales.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Course Sequence</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Badge variant="outline" className="py-1.5">
                  Introduction
                </Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline" className="py-1.5">
                  Prospecting
                </Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline" className="py-1.5">
                  First touchpoint
                </Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline" className="py-1.5">
                  Second touchpoint
                </Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline" className="py-1.5">
                  Closure
                </Badge>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Who Can Join</h3>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Students</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Working professionals (0-4 years)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>People interested in sales</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>BDR, SDR, MDR, AM, AE, AS, Customer success</span>
                </li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="pt-2 pb-6 flex justify-center">
            <Link href="#consulting-plans">
              <Button size="lg" className="font-medium">
                Buy Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
