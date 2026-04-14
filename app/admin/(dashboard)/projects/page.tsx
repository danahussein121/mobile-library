import {
  deleteProjectFormAction,
  saveProjectFormAction,
} from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { DeleteConfirmationForm } from "@/components/admin/delete-confirmation-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup } from "@/components/admin/form-primitives";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";

function ProjectForm({
  project,
}: {
  project?: Awaited<ReturnType<typeof db.project.findMany>>[number];
}) {
  return (
    <AdminActionForm
      action={saveProjectFormAction}
      title={project ? "Edit project" : "Add new project"}
      description="Manage featured projects without changing the public layout."
      pendingLabel="Saving..."
    >
      <input type="hidden" name="id" defaultValue={project?.id} />
      <input type="hidden" name="existingImageUrl" defaultValue={project?.imageUrl || ""} />

      <div className="grid gap-5 lg:grid-cols-2">
        <FieldGroup title="Identity">
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Slug</label>
              <Input name="slug" defaultValue={project?.slug} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Display order</label>
              <Input
                name="order"
                type="number"
                defaultValue={project?.order ?? 0}
                className="h-11 rounded-2xl bg-white px-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Call to action (EN)</label>
              <Input name="ctaLabelEn" required defaultValue={project?.ctaLabelEn} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Call to action (AR)</label>
              <Input name="ctaLabelAr" required defaultValue={project?.ctaLabelAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
            </div>
            <ImageUploadField name="image" label="Image upload" existingUrl={project?.imageUrl} />
          </div>
        </FieldGroup>

        <FieldGroup title="English">
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
              <Input name="titleEn" required defaultValue={project?.titleEn} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <Textarea name="descriptionEn" required defaultValue={project?.descriptionEn} className="min-h-32 rounded-2xl bg-white px-4 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Image alt text</label>
              <Input name="imageAltEn" required defaultValue={project?.imageAltEn} className="h-11 rounded-2xl bg-white px-4" />
            </div>
          </div>
        </FieldGroup>

        <FieldGroup title="Arabic" className="lg:col-span-2">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">العنوان</label>
              <Input name="titleAr" required defaultValue={project?.titleAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">النص البديل للصورة</label>
              <Input name="imageAltAr" required defaultValue={project?.imageAltAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
            </div>
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">الوصف</label>
              <Textarea name="descriptionAr" required defaultValue={project?.descriptionAr} className="min-h-32 rounded-2xl bg-white px-4 py-3" dir="rtl" />
            </div>
          </div>
        </FieldGroup>
      </div>
    </AdminActionForm>
  );
}

export default async function ProjectsAdminPage() {
  const projects = await db.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        eyebrow="Collections"
        title="Projects"
        description="Manage featured project stories and bilingual CTA labels."
      />

      <ProjectForm />

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="space-y-3">
            <ProjectForm project={project} />
            <div className="flex justify-end">
              <DeleteConfirmationForm
                action={deleteProjectFormAction}
                id={project.id}
                itemName={project.titleEn || project.slug}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
