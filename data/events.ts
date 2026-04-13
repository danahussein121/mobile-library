import type { Locale } from "@/lib/i18n";

export type PublicEvent = {
  slug: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  type?: string;
  isTentative?: boolean;
};

const eventImages = {
  reading: "/images/bus-exterior-branded.jpg",
  donation: "/images/bus-exterior-open.png",
  theatre: "/images/bus-interior-art-digital.png",
};

const events: Record<Locale, PublicEvent[]> = {
  en: [
    {
      slug: "summer-reading-kickoff",
      title: "Summer Reading Kickoff",
      date: "June 15, 2026",
      location: "Al-Bireh Community Center",
      description:
        "Join us for a joyful opening day filled with storytelling, book lending, and creative reading activities for children and families.",
      image: eventImages.reading,
      imageAlt: "Children taking part in a summer reading event",
      type: "reading",
    },
    {
      slug: "book-donation-drive",
      title: "Book Donation Drive",
      date: "July 20, 2026",
      location: "Ramallah Cultural Palace",
      description:
        "Help expand our shelves by contributing books and meeting the team behind the mobile library's next community stops.",
      image: eventImages.donation,
      imageAlt: "Community members participating in a book donation drive",
      type: "community",
      isTentative: true,
    },
    {
      slug: "creative-crafts-day",
      title: "Creative Crafts Day",
      date: "August 10, 2026",
      location: "Jalazone Youth Center",
      description:
        "A hands-on day of crafts, drawing, and shared making activities designed to encourage expression, curiosity, and confidence.",
      image: eventImages.theatre,
      imageAlt: "Children participating in a creative crafts workshop",
      type: "workshop",
    },
  ],
  ar: [
    {
      slug: "summer-reading-kickoff",
      title: "انطلاقة القراءة الصيفية",
      date: "15 يونيو 2026",
      location: "مركز البيرة المجتمعي",
      description:
        "انضموا إلينا في يوم افتتاح مليء بالحكايات والإعارة والأنشطة القرائية الإبداعية للأطفال والعائلات.",
      image: eventImages.reading,
      imageAlt: "أطفال يشاركون في فعالية قراءة صيفية",
      type: "reading",
    },
    {
      slug: "book-donation-drive",
      title: "حملة التبرع بالكتب",
      date: "20 يوليو 2026",
      location: "قصر رام الله الثقافي",
      description:
        "ساهموا في توسيع رفوف المكتبة عبر التبرع بالكتب والتعرف إلى فريق المكتبة المتنقلة ومحطاته القادمة.",
      image: eventImages.donation,
      imageAlt: "مشاركون في حملة مجتمعية للتبرع بالكتب",
      type: "community",
      isTentative: true,
    },
    {
      slug: "creative-crafts-day",
      title: "يوم الأشغال الإبداعية",
      date: "10 أغسطس 2026",
      location: "مركز الجلزون الشبابي",
      description:
        "يوم عملي يجمع بين الأشغال اليدوية والرسم وصناعة الأعمال الجماعية لتعزيز التعبير والثقة والفضول.",
      image: eventImages.theatre,
      imageAlt: "أطفال يشاركون في يوم للأشغال الإبداعية",
      type: "workshop",
    },
  ],
};

export function getEvents(locale: Locale) {
  return events[locale];
}
