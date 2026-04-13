import Image from "next/image";

import { deleteProject, saveProject } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup, NativeFileInput } from "@/components/admin/form-primitives";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";

function ProjectForm({
  project,
}: {
  project?: Awaited<ReturnType<typeof db.project.findMany>>[number];
}) {
  return (
    <form action={saveProject} className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]">
      <input type="hidden" name="id" defaultValue={project?.id} />
      <input type="hidden" name="existingImageUrl" defaultValue={project?.imageUrl || ""} />

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            {project ? "Edit project" : "Add new project"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage featured projects without changing the public layout.
          </p>
        </div>
        <button
          type="submit"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Save
        </button>
      </div>

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
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Image upload</label>
              <NativeFileInput name="image" />
            </div>
            {project?.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.imageAltEn || project.titleEn}
                width={320}
                height={180}
                className="rounded-2xl border border-slate-200 object-cover"
              />
            ) : null}
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
    </form>
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
            <form action={deleteProject} className="flex justify-end">
              <input type="hidden" name="id" value={project.id} />
              <button
                type="submit"
                className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
