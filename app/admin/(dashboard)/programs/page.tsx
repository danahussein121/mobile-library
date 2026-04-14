import Image from "next/image";
import Link from "next/link";

import {
  deleteProgramFormAction,
  saveProgramFormAction,
} from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { DeleteConfirmationForm } from "@/components/admin/delete-confirmation-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup } from "@/components/admin/form-primitives";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";

function ProgramForm({
  program,
}: {
  program?: Awaited<ReturnType<typeof db.program.findMany>>[number];
}) {
  return (
    <AdminActionForm
      action={saveProgramFormAction}
      title={program ? "Edit program" : "Add new program"}
      description="Update bilingual titles, descriptions, ordering, and image."
      pendingLabel="Saving..."
    >
      <input type="hidden" name="id" defaultValue={program?.id} />
      <input type="hidden" name="existingImageUrl" defaultValue={program?.imageUrl || ""} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_320px]">
        <FieldGroup title="Identity">
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Slug</label>
              <Input name="slug" defaultValue={program?.slug} className="h-11 rounded-2xl bg-white px-4" />
              <p className="mt-2 text-xs leading-6 text-slate-500">
                A unique ID for this program, e.g. "art-workshops". Use lowercase
                letters and hyphens only.
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Display order</label>
              <Input
                name="order"
                type="number"
                defaultValue={program?.order ?? 0}
                className="h-11 rounded-2xl bg-white px-4"
              />
              <p className="mt-2 text-xs leading-6 text-slate-500">
                Controls the order programs appear on the site. Lower number =
                appears first.
              </p>
            </div>
            <ImageUploadField
              name="image"
              label="Image upload"
              existingUrl={program?.imageUrl}
            />
          </div>
        </FieldGroup>

        <FieldGroup title="English">
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
              <Input name="titleEn" required defaultValue={program?.titleEn} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <Textarea name="descriptionEn" required defaultValue={program?.descriptionEn} className="min-h-32 rounded-2xl bg-white px-4 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Image alt text</label>
              <Input name="imageAltEn" required defaultValue={program?.imageAltEn} className="h-11 rounded-2xl bg-white px-4" />
            </div>
          </div>
        </FieldGroup>

        <FieldGroup title="Arabic" className="lg:col-span-2">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">العنوان</label>
              <Input name="titleAr" required defaultValue={program?.titleAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">النص البديل للصورة</label>
              <Input name="imageAltAr" required defaultValue={program?.imageAltAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
            </div>
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">الوصف</label>
              <Textarea name="descriptionAr" required defaultValue={program?.descriptionAr} className="min-h-32 rounded-2xl bg-white px-4 py-3" dir="rtl" />
            </div>
          </div>
        </FieldGroup>

        <FieldGroup
          title="Preview"
          description="This is a simple mockup of how the card appears on the public site."
          className="h-fit xl:row-span-3"
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[1.35/1] bg-slate-100">
              {program?.imageUrl ? (
                <Image
                  src={program.imageUrl}
                  alt={program.imageAltEn || program.titleEn}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                Services card
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-950">
                {program?.titleEn || "Program title preview"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {program?.descriptionEn ||
                  "Your English description will appear here in the public-facing card layout."}
              </p>
              <Link
                href="/en/services"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-primary transition-colors hover:text-[#0097A7]"
              >
                View live page
              </Link>
            </div>
          </div>
        </FieldGroup>
      </div>
    </AdminActionForm>
  );
}

export default async function ProgramsAdminPage() {
  const programs = await db.program.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        eyebrow="Collections"
        title="Programs & Services"
        description="Create and manage the program cards used across the Services page and supporting homepage sections."
        context={{
          text: "This content appears on the Services page.",
          href: "/en/services",
        }}
      />

      <ProgramForm />

      <div className="space-y-6">
        {programs.map((program) => (
          <div key={program.id} className="space-y-3">
            <ProgramForm program={program} />
            <div className="flex justify-end">
              <DeleteConfirmationForm
                action={deleteProgramFormAction}
                id={program.id}
                itemName={program.titleEn || program.slug}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
