import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AdminLanguage } from "@/lib/admin-language";
import { cn } from "@/lib/utils";

export function AdminBilingualTabs({
  language,
  english,
  arabic,
  className,
}: {
  language: AdminLanguage;
  english: ReactNode;
  arabic: ReactNode;
  className?: string;
}) {
  return (
    <Tabs
      defaultValue={language === "ar" ? "ar" : "en"}
      className={cn("gap-4", className)}
    >
      <TabsList className="h-auto rounded-full bg-slate-100 p-1">
        <TabsTrigger value="en" className="rounded-full px-5 py-2.5 data-active:bg-white">
          English
        </TabsTrigger>
        <TabsTrigger value="ar" className="rounded-full px-5 py-2.5 data-active:bg-white">
          العربية
        </TabsTrigger>
      </TabsList>
      <TabsContent value="en" className="outline-none">
        {english}
      </TabsContent>
      <TabsContent value="ar" className="outline-none">
        <div dir="rtl">{arabic}</div>
      </TabsContent>
    </Tabs>
  );
}
