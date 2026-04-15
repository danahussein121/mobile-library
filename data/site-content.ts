import { getImpactMetricValues } from "@/data/impact-metrics";
import type { Locale } from "@/lib/i18n";

export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  image: string;
  imageAlt: string;
  floatingCard: {
    title: string;
    description: string;
  };
};

export type SimpleSection = {
  title: string;
  description: string;
};

export type FeatureCard = {
  title: string;
  description: string;
};

export type StepCard = {
  title: string;
  description: string;
};

export type ListSection = {
  title: string;
  description: string;
  items: string[];
};

export type GoalSection = {
  title: string;
  description: string;
  items: FeatureCard[];
};

export type ProgramCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type ProjectCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
  cta: string;
};

export type StatCard = {
  label: string;
  value: string;
};

export type EventCard = {
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
};

export type DonationDetails = {
  heading: string;
  description: string;
  tabs: {
    bankTransfer: string;
    onlineSoon: string;
  };
  bankTransfer: {
    title: string;
    helper: string;
    fields: Array<{ label: string; value: string }>;
    referenceNote: string;
  };
  form: {
    title: string;
    description: string;
    name: string;
    email: string;
    amount: string;
    note: string;
    transferDate: string;
    submit: string;
  };
  placeholderCard: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    button: string;
  };
};

export type ContactDetails = {
  title: string;
  description: string;
  details: Array<{ label: string; value: string }>;
  form: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
  };
};

export type FooterContent = {
  description: string;
  contactLabel: string;
  socialLabel: string;
  donateLabel: string;
  rights: string;
  socialLinks: Array<{ label: string; href: string }>;
};

export type SiteContent = {
  siteName: string;
  localeLabel: string;
  nav: NavItem[];
  home: {
    hero: HeroContent;
    about: SimpleSection;
    missionCards: FeatureCard[];
    coreValues: ListSection;
    howItWorks: {
      title: string;
      description: string;
      steps: StepCard[];
    };
    programs: {
      title: string;
      description: string;
      items: ProgramCard[];
    };
    libraryServices: ListSection;
    projects: {
      title: string;
      description: string;
      items: ProjectCard[];
    };
    strategicGoals: GoalSection;
    busFeatures: ListSection;
    targetAudience: ListSection;
    operations: ListSection;
    partnerships: ListSection;
    impact: {
      title: string;
      description: string;
      stats: StatCard[];
    };
    events: {
      title: string;
      description: string;
      items: EventCard[];
    };
    donateCta: {
      title: string;
      description: string;
      button: string;
    };
    finalMessage: SimpleSection;
  };
  pages: {
    about: SimpleSection;
    programs: SimpleSection;
    projects: SimpleSection;
    events: SimpleSection;
    donate: SimpleSection;
    contact: SimpleSection;
  };
  donation: DonationDetails;
  contact: ContactDetails;
  footer: FooterContent;
};

const sharedImages = {
  hero: "/images/bus-exterior-branded.jpg",
  reading: "/images/bus-interior-shelves.jpg",
  storytelling: "/images/bus-exterior-open.png",
  workshops: "/images/bus-interior-art-digital.png",
  schoolVisits: "/images/bus-interior-shelves.jpg",
  handicrafts:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
  projectOne: "/images/bus-exterior-branded.jpg",
  projectTwo: "/images/bus-interior-art-digital.png",
  projectThree: "/images/bus-interior-shelves.jpg",
  eventOne: "/images/bus-exterior-branded.jpg",
  eventTwo: "/images/bus-exterior-open.png",
  eventThree: "/images/bus-interior-art-digital.png",
};

const englishImpactValues = getImpactMetricValues("en");
const arabicImpactValues = getImpactMetricValues("ar");

export const siteContent: Record<Locale, SiteContent> = {
  en: {
    siteName: "Mobile Library for Culture and Arts",
    localeLabel: "English",
    nav: [
      { label: "Home", href: "/en" },
      { label: "About", href: "/en/about" },
      { label: "Programs", href: "/en/programs" },
      { label: "Donate", href: "/en/donate" },
      { label: "Contact", href: "/en/contact" },
    ],
    home: {
      hero: {
        eyebrow: "Mobile cultural initiative",
        title: "A window of knowledge and creativity that reaches you wherever you are",
        description:
          "The Mobile Library for Culture and Arts delivers books, artistic activities, and community learning experiences through a mobile cultural space that reaches residential neighborhoods directly.",
        primaryAction: "Explore Programs",
        secondaryAction: "Support the Project",
        image: sharedImages.hero,
        imageAlt: "Children taking part in a mobile cultural and reading activity",
        floatingCard: {
          title: "Culture beyond walls",
          description:
            "We bring knowledge resources, creative workshops, and artistic encounters into the heart of communities through a welcoming mobile bus.",
        },
      },
      about: {
        title: "The Project",
        description:
          "The Mobile Library for Culture and Arts is a moving cultural center designed to enrich individual lives, strengthen cultural identity, and make knowledge and creativity accessible in places that lack regular libraries or arts spaces.",
      },
      missionCards: [
        {
          title: "Mission",
          description:
            "To offer a comprehensive cultural and artistic experience that transcends physical boundaries, by providing sources of knowledge and creative activities in the heart of residential communities.",
        },
        {
          title: "Vision",
          description:
            "To be the most influential mobile cultural center, enriching the lives of individuals and promoting cultural identity wherever we go.",
        },
        {
          title: "Our Role",
          description:
            "We connect books, arts, and community engagement in a mobile model that is human-centered, flexible, and accessible.",
        },
      ],
      coreValues: {
        title: "Core Values",
        description:
          "The principles that shape how the project is designed, delivered, and sustained.",
        items: ["Holism", "Innovation", "Sustainability", "Excellence"],
      },
      howItWorks: {
        title: "Operations & Coverage",
        description:
          "The project operates through a field-based approach that prioritizes access, continuity, and measurable service delivery.",
        steps: [
          {
            title: "Identify priority areas",
            description:
              "We study communities and determine the areas most in need of cultural and library services.",
          },
          {
            title: "Run recurring visits",
            description:
              "The mobile bus follows weekly and monthly schedules while also taking part in festivals and public events.",
          },
          {
            title: "Track the service digitally",
            description:
              "Digital tools help us follow usage, coverage, and service quality over time.",
          },
        ],
      },
      programs: {
        title: "Programs & Activities",
        description:
          "The project combines reading, arts, performance, and hands-on creativity in one mobile cultural experience.",
        items: [
          {
            title: "Art Workshops",
            description:
              "Creative workshops in drawing, Arabic calligraphy, and visual arts that encourage self-expression and artistic discovery.",
            image: sharedImages.workshops,
            alt: "Children participating in an art workshop",
          },
          {
            title: "Mobile Cinema",
            description:
              "Showing educational and documentary films on external screens to make learning more engaging and accessible in community settings.",
            image: sharedImages.storytelling,
            alt: "Educational mobile cinema screening",
          },
          {
            title: "Small Theatre",
            description:
              "Interactive theatre and puppet performances that bring stories, imagination, and participation to life.",
            image: sharedImages.schoolVisits,
            alt: "Interactive small theatre activity for children",
          },
          {
            title: "Handicrafts Corner",
            description:
              "A practical space for traditional and modern crafts that helps young participants build creative and manual skills.",
            image: sharedImages.handicrafts,
            alt: "Children taking part in handicrafts activities",
          },
        ],
      },
      projects: {
        title: "Featured Initiatives",
        description:
          "These initiative tracks translate the project mission into repeatable cultural services with real community reach.",
        items: [
          {
            title: "Reading Access Journeys",
            description:
              "A recurring outreach track that brings curated books, reading circles, and guided borrowing directly into neighborhoods where access to libraries is limited. Each stop is designed to make reading visible, social, and easy to return to.",
            image: sharedImages.projectOne,
            alt: "Children discovering books in a mobile cultural stop",
            cta: "Learn More",
          },
          {
            title: "Talent Discovery Labs",
            description:
              "Hands-on workshops that help children and youth explore drawing, calligraphy, crafts, and creative expression with support from facilitators. The program creates an early pathway for confidence, experimentation, and skill development.",
            image: sharedImages.projectTwo,
            alt: "Young participants in an arts development activity",
            cta: "Learn More",
          },
          {
            title: "Community Awareness Programs",
            description:
              "Mobile learning sessions that connect cultural participation with topics such as local heritage, public belonging, and community wellbeing. Activities are designed to be practical, discussion-based, and welcoming to families.",
            image: sharedImages.projectThree,
            alt: "Community learning and cultural awareness activity",
            cta: "Learn More",
          },
        ],
      },
      strategicGoals: {
        title: "Strategic Goals",
        description:
          "The project is guided by four strategic goals that connect culture, access, and community impact.",
        items: [
          {
            title: "Spread a culture of reading",
            description:
              "Turn reading into an enjoyable daily habit for all ages through direct and attractive access.",
          },
          {
            title: "Support artistic talent",
            description:
              "Create opportunities to discover and develop artistic, technical, and manual skills among children and youth.",
          },
          {
            title: "Promote community awareness",
            description:
              "Deliver awareness and educational programs that connect communities with local issues, civic participation, and cultural heritage.",
          },
          {
            title: "Reduce the knowledge gap",
            description:
              "Extend cultural services to areas that lack public libraries, arts spaces, and regular access to learning opportunities.",
          },
        ],
      },
      libraryServices: {
        title: "Library Services",
        description:
          "The mobile unit combines physical and digital library access with smart tools that make discovery and borrowing easier.",
        items: [
          "Paper library with books in literature, science, and children’s content",
          "Digital library with tablets offering e-books and magazines",
          "Smart lending system",
          "Reference corner for students and researchers",
        ],
      },
      busFeatures: {
        title: "Mobile Bus Features",
        description:
          "The bus is designed as a practical, comfortable, and inclusive mobile cultural environment.",
        items: [
          "Solar panel energy system",
          "Hydraulic platforms for disability access",
          "Central air conditioning with smart LED lighting",
          "High-speed wireless internet",
          "Foldable shelves and flexible art platforms",
        ],
      },
      targetAudience: {
        title: "Target Audience",
        description:
          "The service is designed to reach diverse groups while prioritizing access for underserved communities.",
        items: [
          "Children and youth",
          "Students and researchers",
          "Elderly",
          "Remote communities",
        ],
      },
      operations: {
        title: "Coverage Model",
        description:
          "The project combines recurring visits, public participation, and data-informed service delivery.",
        items: [
          "Identifying high-need areas",
          "Regular visits (weekly/monthly)",
          "Participation in festivals and events",
          "Digital tools for tracking location and booking",
        ],
      },
      partnerships: {
        title: "Partnerships",
        description:
          "Long-term impact depends on collaboration across sectors and with community contributors.",
        items: [
          "Government sector",
          "Private sector",
          "Nonprofit institutions",
          "Volunteers",
        ],
      },
      impact: {
        title: "Impact Framework",
        description:
          "The project tracks reach and effect through practical indicators that reflect cultural access and social value.",
        stats: [
          { label: "Beneficiaries reached", value: englishImpactValues[0] },
          { label: "Activities delivered", value: englishImpactValues[1] },
          { label: "Locations reached", value: englishImpactValues[2] },
          { label: "Young talents engaged", value: englishImpactValues[3] },
        ],
      },
      events: {
        title: "Program Moments",
        description:
          "Recurring mobile activities make culture visible in everyday life across neighborhoods and community spaces.",
        items: [
          {
            title: "Mobile Cinema Evening",
            date: "Recurring field activation",
            description:
              "Educational and documentary screenings hosted in a mobile setup that invites shared community viewing.",
            image: sharedImages.eventOne,
            alt: "Mobile cinema community event",
          },
          {
            title: "Interactive Puppet Theatre",
            date: "Community engagement format",
            description:
              "A small theatre experience designed to combine storytelling, participation, and artistic play.",
            image: sharedImages.eventTwo,
            alt: "Interactive puppet theatre event",
          },
          {
            title: "Creative Crafts Day",
            date: "Hands-on cultural activity",
            description:
              "A practical station for traditional and modern crafts that encourages expression, focus, and skill-building.",
            image: sharedImages.eventThree,
            alt: "Handicrafts and creative activity day",
          },
        ],
      },
      donateCta: {
        title: "Help this cultural window reach more communities",
        description:
          "Your support helps the project expand its mobile services, enrich its resources, and sustain cultural access in underserved areas.",
        button: "Support the Project",
      },
      finalMessage: {
        title: "Final Message",
        description:
          "The mobile library is not just a means of transport, but a bridge of knowledge and beauty that reaches everyone.",
      },
    },
    pages: {
      about: {
        title: "About the Mobile Library for Culture and Arts",
        description:
          "A mobile cultural project that combines reading, arts, awareness, and access in one community-centered experience.",
      },
      programs: {
        title: "Programs & Activities",
        description:
          "A blend of cultural, artistic, educational, and hands-on activities designed for diverse age groups.",
      },
      projects: {
        title: "Implementation Initiatives",
        description:
          "Focused initiative tracks that turn the project vision into measurable cultural and social service delivery.",
      },
      events: {
        title: "Events & Community Activations",
        description:
          "Recurring mobile formats that bring cinema, theatre, crafts, and cultural learning into public life.",
      },
      donate: {
        title: "Support the Project",
        description:
          "Support helps sustain mobile cultural services and extend access to communities that need them most.",
      },
      contact: {
        title: "Get in Touch",
        description:
          "Reach out for partnerships, support, field coordination, or inquiries about the mobile cultural project.",
      },
    },
    donation: {
      heading: "Give Through Bank Transfer",
      description:
        "We are currently accepting donations through bank transfer while online donations are being prepared.",
      tabs: {
        bankTransfer: "Bank Transfer",
        onlineSoon: "Online Donations (Coming Soon)",
      },
      bankTransfer: {
        title: "Bank Transfer Details",
        helper:
          "Official donation methods can be configured securely before launch.",
        fields: [
          { label: "Bank Name", value: "" },
          { label: "Account Name", value: "" },
          { label: "Account Number", value: "" },
          { label: "IBAN", value: "" },
        ],
        referenceNote:
          "Please include 'MobileLibraryDonation' as reference",
      },
      form: {
        title: "Notify Us About Your Transfer",
        description:
          "Use this form after completing an official transfer so the project team can confirm receipt and follow up if needed.",
        name: "Name",
        email: "Email",
        amount: "Amount",
        note: "Note",
        transferDate: "Transfer Date",
        submit: "Submit Donation Note",
      },
      placeholderCard: {
        title: "Online donations are not live yet",
        description:
          "When a secure online donation option is officially available, it will be announced here.",
      },
      cta: {
        title: "Want to sponsor a full cultural visit?",
        button: "Contact the Project Team",
      },
    },
    contact: {
      title: "Connect with the Project",
      description:
        "We welcome inquiries from partners, supporters, volunteers, and communities interested in hosting the mobile service.",
      details: [
        { label: "Email", value: "Mobile.library1@outlook.com" },
        { label: "Phone", value: "+970597010189" },
        { label: "Website", value: "www.mobilelibrary.ps" },
      ],
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
      },
    },
    footer: {
      description:
        "The Mobile Library for Culture and Arts brings books, artistic activities, and cultural learning directly to communities.",
      contactLabel: "Contact",
      socialLabel: "Direct links",
      donateLabel: "Support the project",
      rights: "All rights reserved.",
      socialLinks: [
        { label: "Website", href: "https://www.mobilelibrary.ps" },
        { label: "Email", href: "mailto:Mobile.library1@outlook.com" },
        { label: "Phone", href: "tel:+970597010189" },
      ],
    },
  },
  ar: {
    siteName: "المكتبة المتنقلة للثقافة والفنون",
    localeLabel: "العربية",
    nav: [
      { label: "الرئيسية", href: "/ar" },
      { label: "من نحن", href: "/ar/about" },
      { label: "البرامج", href: "/ar/programs" },
      { label: "تبرع", href: "/ar/donate" },
      { label: "تواصل معنا", href: "/ar/contact" },
    ],
    home: {
      hero: {
        eyebrow: "مبادرة ثقافية متنقلة",
        title: "نافذة المعرفة والإبداع التي تصل إليك أينما كنت",
        description:
          "المكتبة المتنقلة للثقافة والفنون مساحة ثقافية متنقلة تنقل الكتب والأنشطة الإبداعية ومصادر المعرفة مباشرة إلى الأحياء والتجمعات السكنية.",
        primaryAction: "استكشف البرامج",
        secondaryAction: "ادعم المشروع",
        image: sharedImages.hero,
        imageAlt: "أطفال يشاركون في نشاط ثقافي متنقل",
        floatingCard: {
          title: "الثقافة خارج الجدران",
          description:
            "نوصل مصادر المعرفة وورش الإبداع والأنشطة الفنية إلى قلب المجتمع من خلال حافلة ثقافية مرحبة بالجميع.",
        },
      },
      about: {
        title: "عن المشروع",
        description:
          "انطلق المشروع ليقرب الثقافة من الناس في الأماكن التي تفتقر إلى المكتبات والمراكز الفنية، ويحوّل الوصول إلى القراءة والفنون إلى تجربة قريبة ومنتظمة ومفتوحة للجميع.",
      },
      missionCards: [
        {
          title: "الرسالة",
          description:
            "تقديم تجربة ثقافية وفنية متكاملة تتجاوز حدود الجدران، من خلال توفير مصادر المعرفة والأنشطة الإبداعية في قلب التجمعات السكنية.",
        },
        {
          title: "الرؤية",
          description:
            "أن نكون المركز الثقافي المتنقل الأكثر تأثيراً في إثراء حياة الأفراد وتعزيز الهوية الثقافية في كل مكان نصل إليه.",
        },
        {
          title: "دور المشروع",
          description:
            "نربط بين القراءة والفنون والوعي المجتمعي في نموذج متنقل مرن وإنساني وقريب من الناس.",
        },
      ],
      coreValues: {
        title: "القيم الأساسية",
        description:
          "المبادئ التي تشكل طريقة تصميم المشروع وتنفيذه واستدامته.",
        items: ["الشمولية", "الابتكار", "الاستدامة", "التميز"],
      },
      howItWorks: {
        title: "التشغيل والتغطية",
        description:
          "نعمل وفق خطة ميدانية واضحة تبدأ بتحديد الاحتياج، ثم تنظيم الزيارات، ثم متابعة أثر الخدمة وتحسينها باستمرار.",
        steps: [
          {
            title: "تحديد المناطق الأكثر احتياجاً",
            description:
              "نرصد التجمعات التي تحتاج إلى خدمات ثقافية ومعرفية ونحدد أولويات الوصول إليها.",
          },
          {
            title: "زيارات دورية ومنتظمة",
            description:
              "تتحرك الحافلة وفق زيارات أسبوعية أو شهرية، مع المشاركة في الفعاليات والمهرجانات.",
          },
          {
            title: "متابعة رقمية للخدمة",
            description:
              "نستخدم وسائل رقمية لتتبع الاستخدام والتغطية وتحسين جودة الخدمة بمرور الوقت.",
          },
        ],
      },
      programs: {
        title: "البرامج والأنشطة",
        description:
          "نقدم باقة من الأنشطة القرائية والفنية والتفاعلية التي تجعل الزيارة الثقافية تجربة حية ومناسبة لفئات عمرية متنوعة.",
        items: [
          {
            title: "ورش العمل الفنية",
            description:
              "ورش في الرسم والخط العربي والأعمال الفنية تفتح المجال للتعبير واكتشاف المواهب الإبداعية.",
            image: sharedImages.workshops,
            alt: "أطفال يشاركون في ورشة فنية",
          },
          {
            title: "السينما المتنقلة",
            description:
              "عرض أفلام تعليمية ووثائقية على شاشات خارجية تجعل التعلم أكثر جاذبية وتصل بالمحتوى المعرفي إلى المجتمع مباشرة.",
            image: sharedImages.storytelling,
            alt: "عرض سينما متنقلة تعليمية",
          },
          {
            title: "المسرح الصغير",
            description:
              "مسرح تفاعلي ومسرح عرائس يقدمان الحكاية بشكل حي ويشجعان المشاركة والخيال.",
            image: sharedImages.schoolVisits,
            alt: "نشاط مسرح صغير تفاعلي للأطفال",
          },
          {
            title: "ركن الأشغال اليدوية",
            description:
              "مساحة عملية للحرف التقليدية والحديثة تساعد الناشئة والشباب على تنمية المهارات اليدوية والإبداعية.",
            image: sharedImages.handicrafts,
            alt: "أطفال يشاركون في نشاط أشغال يدوية",
          },
        ],
      },
      libraryServices: {
        title: "خدمات المكتبة",
        description:
          "توفر الوحدة المتنقلة خدمات مكتبية عملية تجمع بين القراءة الورقية والرقمية وتسهّل الاستعارة والوصول إلى المعرفة.",
        items: [
          "مكتبة ورقية تضم كتبًا في الأدب والعلوم ومحتوى الأطفال",
          "مكتبة رقمية عبر أجهزة لوحية تحتوي على كتب إلكترونية ومجلات",
          "نظام إعارة ذكي",
          "ركن مرجعي للطلاب والباحثين",
        ],
      },
      projects: {
        title: "مبادرات تنفيذية",
        description:
          "تمثل هذه المبادرات مسارات عملية تترجم رسالة المشروع إلى خدمات ثقافية قابلة للتكرار والتوسع.",
        items: [
          {
            title: "محطات الوصول الثقافي",
            description:
              "مسار ميداني منتظم يوصل الكتب وجلسات القراءة والإعارة الموجهة مباشرة إلى الأحياء التي تقل فيها فرص الوصول إلى المكتبات. كل محطة مصممة لتجعل القراءة أقرب للحياة اليومية وأكثر حضورًا داخل المجتمع.",
            image: sharedImages.projectOne,
            alt: "أطفال يكتشفون الكتب في محطة ثقافية متنقلة",
            cta: "اعرف المزيد",
          },
          {
            title: "مسارات اكتشاف المواهب",
            description:
              "ورش عملية تساعد الأطفال واليافعين على استكشاف الرسم والخط والأشغال اليدوية والتعبير الإبداعي بإشراف تربوي وفني. يركز هذا المسار على بناء الثقة وفتح مساحات مبكرة لاكتشاف الموهبة.",
            image: sharedImages.projectTwo,
            alt: "مشاركون في نشاط لتطوير المواهب الفنية",
            cta: "اعرف المزيد",
          },
          {
            title: "برامج الوعي المجتمعي",
            description:
              "جلسات ثقافية متنقلة تربط المشاركة المجتمعية بموضوعات التراث المحلي والانتماء والوعي بالقضايا العامة. تقدم الأنشطة بصيغة تفاعلية تجعل التعلم قريبًا من العائلات والمشاركين.",
            image: sharedImages.projectThree,
            alt: "نشاط للتوعية المجتمعية والثقافية",
            cta: "اعرف المزيد",
          },
        ],
      },
      strategicGoals: {
        title: "الأهداف الاستراتيجية",
        description:
          "يقود المشروع أربعة أهداف استراتيجية تربط الثقافة بالوصول والتمكين والأثر المجتمعي.",
        items: [
          {
            title: "نشر ثقافة القراءة",
            description:
              "تحويل القراءة إلى ممارسة يومية ممتعة وجذابة لجميع الأعمار من خلال الوصول المباشر.",
          },
          {
            title: "دعم المواهب الفنية",
            description:
              "توفير منصة لاكتشاف وتنمية المهارات الفنية واليدوية لدى الناشئة والشباب.",
          },
          {
            title: "تعزيز الوعي المجتمعي",
            description:
              "تقديم برامج توعوية وتثقيفية حول قضايا المجتمع والتراث المحلي.",
          },
          {
            title: "تقليص الفجوة المعرفية",
            description:
              "ضمان وصول الخدمات الثقافية للمناطق التي تفتقر للمكتبات والمراكز الفنية.",
          },
        ],
      },
      busFeatures: {
        title: "مواصفات الحافلة المتنقلة",
        description:
          "صممت الحافلة لتكون بيئة ثقافية عملية ومريحة وشاملة وسهلة الوصول.",
        items: [
          "نظام طاقة يعمل بالألواح الشمسية",
          "منصات هيدروليكية لسهولة وصول ذوي الإعاقة",
          "تكييف مركزي مع إضاءة LED ذكية",
          "إنترنت لاسلكي عالي السرعة",
          "أرفف قابلة للطي ومنصات فنية مرنة",
        ],
      },
      targetAudience: {
        title: "الفئات المستهدفة",
        description:
          "نركز على الفئات التي تحتاج إلى وصول أسهل للمعرفة والأنشطة الثقافية، مع مراعاة تنوع الأعمار والاحتياجات.",
        items: [
          "الأطفال والناشئة",
          "الطلاب والباحثون",
          "كبار السن",
          "المناطق النائية",
        ],
      },
      operations: {
        title: "آلية التشغيل والتغطية",
        description:
          "تعتمد الخدمة على جداول ميدانية منتظمة وتنسيق مجتمعي ومتابعة رقمية تضمن استمرارية الوصول وتحسين التجربة.",
        items: [
          "تحديد المناطق الأكثر احتياجاً",
          "زيارات دورية أسبوعية أو شهرية",
          "المشاركة في الفعاليات والمهرجانات",
          "استخدام وسائل رقمية لتتبع الخدمة",
        ],
      },
      partnerships: {
        title: "الشراكات",
        description:
          "يساعد التعاون مع الشركاء والداعمين والمتطوعين على توسيع التغطية وضمان استدامة الخدمة في مناطق أكثر.",
        items: [
          "القطاع الحكومي",
          "القطاع الخاص",
          "المؤسسات غير الربحية",
          "المتطوعون",
        ],
      },
      impact: {
        title: "مؤشرات الأثر",
        description:
          "نقيس الأثر عبر مؤشرات تتابع حجم الوصول ونوعية المشاركة والقيمة الاجتماعية التي تحققها الزيارات الثقافية.",
        stats: [
          { label: "عدد المستفيدين", value: arabicImpactValues[0] },
          { label: "عدد الأنشطة", value: arabicImpactValues[1] },
          { label: "عدد المواقع", value: arabicImpactValues[2] },
          { label: "عدد المواهب المشاركة", value: arabicImpactValues[3] },
        ],
      },
      events: {
        title: "محطات وفعاليات المشروع",
        description:
          "تجعل الأنشطة المتنقلة الثقافة حاضرة في الحياة اليومية عبر محطات متكررة ولقاءات مجتمعية متنوعة.",
        items: [
          {
            title: "أمسية السينما المتنقلة",
            date: "صيغة ميدانية متكررة",
            description:
              "عروض تعليمية ووثائقية في مساحة متنقلة تتيح مشاهدة جماعية هادفة وممتعة للمجتمع.",
            image: sharedImages.eventOne,
            alt: "فعالية سينما متنقلة مجتمعية",
          },
          {
            title: "مسرح العرائس التفاعلي",
            date: "نشاط تفاعلي مجتمعي",
            description:
              "تجربة مسرحية صغيرة تجمع بين الحكاية والمشاركة واللعب الفني في قالب قريب من الأطفال.",
            image: sharedImages.eventTwo,
            alt: "فعالية مسرح عرائس تفاعلي",
          },
          {
            title: "يوم الإبداع والأشغال اليدوية",
            date: "نشاط تطبيقي ثقافي",
            description:
              "محطة عملية للحرف التقليدية والحديثة تشجع التعبير والتركيز وبناء المهارات.",
            image: sharedImages.eventThree,
            alt: "يوم للأشغال اليدوية والأنشطة الإبداعية",
          },
        ],
      },
      donateCta: {
        title: "ساعد هذه النافذة الثقافية على الوصول إلى مجتمعات أكثر",
        description:
          "بدعمك نستطيع زيادة الزيارات وتوسيع المحتوى الثقافي والوصول إلى مجتمعات جديدة تحتاج إلى هذه الفرصة.",
        button: "ادعم المشروع",
      },
      finalMessage: {
        title: "الرسالة الختامية",
        description:
          "المكتبة المتنقلة ليست مجرد وسيلة نقل، بل هي جسر للمعرفة والجمال يصل إلى الجميع.",
      },
    },
    pages: {
      about: {
        title: "عن المكتبة المتنقلة للثقافة والفنون",
        description:
          "مشروع ثقافي متنقل يجمع بين القراءة والفنون والتوعية والوصول المجتمعي في تجربة واحدة متكاملة.",
      },
      programs: {
        title: "البرامج والأنشطة",
        description:
          "مزيج من الأنشطة الثقافية والفنية والتعليمية والعملية المصممة لفئات عمرية متنوعة.",
      },
      projects: {
        title: "المبادرات التنفيذية",
        description:
          "مسارات تنفيذية نوعية تحول رؤية المشروع إلى خدمات ثقافية واجتماعية قابلة للقياس والتوسع.",
      },
      events: {
        title: "الفعاليات والمحطات المجتمعية",
        description:
          "صيغ وأنشطة متنقلة تجعل السينما والمسرح والأشغال اليدوية والتعلم الثقافي جزءًا من الحياة العامة.",
      },
      donate: {
        title: "ادعم المشروع",
        description:
          "يساعد الدعم على استدامة الخدمات الثقافية المتنقلة وتوسيع الوصول إلى المجتمعات الأكثر احتياجاً.",
      },
      contact: {
        title: "تواصل معنا",
        description:
          "نرحب باستفسارات الشركاء والداعمين والمتطوعين والمجتمعات الراغبة في استضافة الخدمة المتنقلة.",
      },
    },
    donation: {
      heading: "تبرع عبر التحويل البنكي",
      description:
        "نستقبل التبرعات حاليًا عبر التحويل البنكي فقط، بينما نعمل على تجهيز التبرع الإلكتروني لاحقًا.",
      tabs: {
        bankTransfer: "تحويل بنكي",
        onlineSoon: "تبرعات إلكترونية (قريبًا)",
      },
      bankTransfer: {
        title: "بيانات التحويل البنكي",
        helper:
          "يمكن إعداد وسائل التبرع الرسمية بشكل آمن قبل الإطلاق النهائي.",
        fields: [
          { label: "اسم البنك", value: "" },
          { label: "اسم الحساب", value: "" },
          { label: "رقم الحساب", value: "" },
          { label: "الآيبان", value: "" },
        ],
        referenceNote:
          "يرجى إضافة 'MobileLibraryDonation' كمرجع للتحويل",
      },
      form: {
        title: "أبلغنا بالتحويل",
        description:
          "هذا النموذج للواجهة فقط ويمكن ربطه لاحقًا بنظامك الخلفي المفضل.",
        name: "الاسم",
        email: "البريد الإلكتروني",
        amount: "قيمة التبرع",
        note: "ملاحظة",
        transferDate: "تاريخ التحويل",
        submit: "إرسال بيانات التبرع",
      },
      placeholderCard: {
        title: "التبرع الإلكتروني قريبًا",
        description:
          "عند توفر وسيلة تبرع إلكترونية آمنة بشكل رسمي، سيتم الإعلان عنها هنا.",
      },
      cta: {
        title: "هل ترغب في رعاية زيارة ثقافية كاملة؟",
        button: "تواصل مع فريق المشروع",
      },
    },
    contact: {
      title: "تواصل مع المشروع",
      description:
        "يسعدنا استقبال استفسارات الشركاء والداعمين والمتطوعين والمجتمعات المهتمة باستضافة الخدمة المتنقلة.",
      details: [
        { label: "البريد الإلكتروني", value: "Mobile.library1@outlook.com" },
        { label: "الهاتف", value: "+970597010189" },
        { label: "الموقع الإلكتروني", value: "www.mobilelibrary.ps" },
      ],
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "رسالتك",
        submit: "إرسال الرسالة",
      },
    },
    footer: {
      description:
        "المكتبة المتنقلة للثقافة والفنون توصل الكتب والأنشطة الفنية والتعلم الثقافي مباشرة إلى المجتمعات.",
      contactLabel: "تواصل",
      socialLabel: "روابط مباشرة",
      donateLabel: "ادعم المشروع",
      rights: "جميع الحقوق محفوظة.",
      socialLinks: [
        { label: "الموقع الإلكتروني", href: "https://www.mobilelibrary.ps" },
        { label: "البريد الإلكتروني", href: "mailto:Mobile.library1@outlook.com" },
        { label: "الهاتف", href: "tel:+970597010189" },
      ],
    },
  },
};

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}
