import {
  deleteEventFormAction,
  saveEventFormAction,
} from "@/app/admin/actions";
import { AdminActionForm } from "@/components/admin/admin-action-form";
import { DeleteConfirmationForm } from "@/components/admin/delete-confirmation-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup } from "@/components/admin/form-primitives";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";

function EventForm({
  event,
}: {
  event?: Awaited<ReturnType<typeof db.event.findMany>>[number];
}) {
  const defaultDate = event?.eventDate.toISOString().slice(0, 10);

  return (
    <AdminActionForm
      action={saveEventFormAction}
      title={event ? "Edit event" : "Add new event"}
      description="Keep event cards, dates, and bilingual copy up to date."
      pendingLabel="Saving..."
    >
      <input type="hidden" name="id" defaultValue={event?.id} />
      <input type="hidden" name="existingImageUrl" defaultValue={event?.imageUrl || ""} />

      <div className="grid gap-5 lg:grid-cols-2">
        <FieldGroup title="Identity">
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Slug</label>
              <Input name="slug" defaultValue={event?.slug} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Display order</label>
              <Input
                name="order"
                type="number"
                defaultValue={event?.order ?? 0}
                className="h-11 rounded-2xl bg-white px-4"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Event date</label>
              <Input name="eventDate" type="date" required defaultValue={defaultDate} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <ImageUploadField name="image" label="Image upload" existingUrl={event?.imageUrl} />
          </div>
        </FieldGroup>

        <FieldGroup title="English">
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Title</label>
              <Input name="titleEn" required defaultValue={event?.titleEn} className="h-11 rounded-2xl bg-white px-4" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <Textarea name="descriptionEn" required defaultValue={event?.descriptionEn} className="min-h-32 rounded-2xl bg-white px-4 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Image alt text</label>
              <Input name="imageAltEn" required defaultValue={event?.imageAltEn} className="h-11 rounded-2xl bg-white px-4" />
            </div>
          </div>
        </FieldGroup>

        <FieldGroup title="Arabic" className="lg:col-span-2">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">العنوان</label>
              <Input name="titleAr" required defaultValue={event?.titleAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">النص البديل للصورة</label>
              <Input name="imageAltAr" required defaultValue={event?.imageAltAr} className="h-11 rounded-2xl bg-white px-4" dir="rtl" />
            </div>
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">الوصف</label>
              <Textarea name="descriptionAr" required defaultValue={event?.descriptionAr} className="min-h-32 rounded-2xl bg-white px-4 py-3" dir="rtl" />
            </div>
          </div>
        </FieldGroup>
      </div>
    </AdminActionForm>
  );
}

export default async function EventsAdminPage() {
  const events = await db.event.findMany({
    orderBy: [{ order: "asc" }, { eventDate: "asc" }],
  });

  return (
    <div className="space-y-6 py-2">
      <AdminPageHeader
        eyebrow="Collections"
        title="Events"
        description="Manage event cards and dates shown across the site."
        context={{
          text: "Events appear on the Events page and homepage preview.",
          href: "/en/events",
        }}
      />

      <EventForm />

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="space-y-3">
            <EventForm event={event} />
            <div className="flex justify-end">
              <DeleteConfirmationForm
                action={deleteEventFormAction}
                id={event.id}
                itemName={event.titleEn || event.slug}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
