import Image from "next/image";

import { deleteEvent, saveEvent } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { FieldGroup, NativeFileInput } from "@/components/admin/form-primitives";
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
    <form action={saveEvent} className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_25px_70px_-55px_rgba(15,23,42,0.3)]">
      <input type="hidden" name="id" defaultValue={event?.id} />
      <input type="hidden" name="existingImageUrl" defaultValue={event?.imageUrl || ""} />

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            {event ? "Edit event" : "Add new event"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Keep event cards, dates, and bilingual copy up to date.
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
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Image upload</label>
              <NativeFileInput name="image" />
            </div>
            {event?.imageUrl ? (
              <Image
                src={event.imageUrl}
                alt={event.imageAltEn || event.titleEn}
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
    </form>
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
      />

      <EventForm />

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="space-y-3">
            <EventForm event={event} />
            <form action={deleteEvent} className="flex justify-end">
              <input type="hidden" name="id" value={event.id} />
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
