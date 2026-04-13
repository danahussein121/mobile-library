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
  hero:
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1400&q=80",
  reading:
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
  storytelling:
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
  workshops:
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80",
  schoolVisits:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80",
  projectOne:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
  projectTwo:
    "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1200&q=80",
  projectThree:
    "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&w=1200&q=80",
  eventOne:
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
  eventTwo:
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
  eventThree:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
};

export const siteContent: Record<Locale, SiteContent> = {
  en: {
    siteName: "Mobile Library for Culture and Arts",
    localeLabel: "English",
    nav: [
      { label: "Home", href: "/en" },
      { label: "About", href: "/en/about" },
      { label: "Programs", href: "/en/programs" },
      { label: "Projects", href: "/en/projects" },
      { label: "Events", href: "/en/events" },
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
              "Educational and documentary screenings that make learning more engaging and accessible in community settings.",
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
            image: sharedImages.reading,
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
              "Regular mobile visits that turn reading into an enjoyable daily practice through direct access to books and cultural content.",
            image: sharedImages.projectOne,
            alt: "Children discovering books in a mobile cultural stop",
            cta: "Learn More",
          },
          {
            title: "Talent Discovery Labs",
            description:
              "Creative tracks that help identify and develop artistic and craft skills among children and youth.",
            image: sharedImages.projectTwo,
            alt: "Young participants in an arts development activity",
            cta: "Learn More",
          },
          {
            title: "Community Awareness Programs",
            description:
              "Cultural programs that raise awareness around community issues and local heritage through interactive learning.",
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
              "Providing a platform to discover and develop technical and manual skills among youth.",
          },
          {
            title: "Promoting community awareness",
            description:
              "Providing awareness and educational programs about community issues and local heritage.",
          },
          {
            title: "Reduce the knowledge gap",
            description:
              "Ensuring access to cultural services in areas lacking public libraries and art centers.",
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
          "Smart design with optimal use of space",
          "Foldable shelves and comfortable seating",
          "Advanced technology including Wi-Fi, LED lighting, and air conditioning",
          "Solar energy system",
          "Accessibility for people with disabilities",
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
          { label: "Beneficiaries reached", value: "Growing" },
          { label: "Number of events and activities", value: "Ongoing" },
          { label: "Lending statistics", value: "Tracked" },
          { label: "Social impact on the community", value: "Visible" },
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
          "Please replace these sample details with the official project banking information before launch.",
        fields: [
          { label: "Bank Name", value: "Al Noor Community Bank" },
          {
            label: "Account Name",
            value: "Mobile Library for Culture and Arts",
          },
          { label: "Account Number", value: "00124578963" },
          { label: "IBAN", value: "JO94NBRB001245789630000000001" },
        ],
        referenceNote:
          "Please include 'MobileLibraryDonation' as reference",
      },
      form: {
        title: "Notify Us About Your Transfer",
        description:
          "This form is for interface purposes only and can later connect to your preferred backend workflow.",
        name: "Name",
        email: "Email",
        amount: "Amount",
        note: "Note",
        transferDate: "Transfer Date",
        submit: "Submit Donation Note",
      },
      placeholderCard: {
        title: "Online donations are coming soon",
        description:
          "A future version can integrate an online payment gateway when the project is ready.",
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
      { label: "المشاريع", href: "/ar/projects" },
      { label: "الفعاليات", href: "/ar/events" },
      { label: "تبرع", href: "/ar/donate" },
      { label: "تواصل معنا", href: "/ar/contact" },
    ],
    home: {
      hero: {
        eyebrow: "مبادرة ثقافية متنقلة",
        title: "نافذة المعرفة والإبداع التي تصل إليك أينما كنت",
        description:
          "المكتبة المتنقلة للثقافة والفنون تقدم تجربة ثقافية وفنية متكاملة تتجاوز حدود الجدران، وتصل إلى التجمعات السكنية بالكتب والأنشطة الإبداعية ومصادر المعرفة.",
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
          "المكتبة المتنقلة للثقافة والفنون مركز ثقافي متنقل يهدف إلى إثراء حياة الأفراد وتعزيز الهوية الثقافية، عبر إيصال المعرفة والإبداع إلى المناطق التي تفتقر إلى المكتبات والمراكز الفنية.",
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
          "يعتمد المشروع على نموذج ميداني يركز على الوصول والاستمرارية وقياس الأثر.",
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
          "يجمع المشروع بين القراءة والفنون والعروض التفاعلية والتجربة العملية في مساحة ثقافية متنقلة واحدة.",
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
              "عروض تعليمية ووثائقية تجعل التعلم أكثر جاذبية وتصل بالمحتوى المعرفي إلى المجتمع مباشرة.",
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
            image: sharedImages.reading,
            alt: "أطفال يشاركون في نشاط أشغال يدوية",
          },
        ],
      },
      libraryServices: {
        title: "خدمات المكتبة",
        description:
          "تجمع الوحدة المتنقلة بين الوصول إلى المكتبة الورقية والرقمية مع أدوات ذكية تسهل الاكتشاف والاستعارة.",
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
              "زيارات متنقلة منتظمة تحول القراءة والثقافة إلى ممارسة قريبة وممتعة من خلال الوصول المباشر للمجتمع.",
            image: sharedImages.projectOne,
            alt: "أطفال يكتشفون الكتب في محطة ثقافية متنقلة",
            cta: "اعرف المزيد",
          },
          {
            title: "مسارات اكتشاف المواهب",
            description:
              "أنشطة ومسارات إبداعية تساعد على اكتشاف وتنمية المهارات الفنية واليدوية لدى الناشئة والشباب.",
            image: sharedImages.projectTwo,
            alt: "مشاركون في نشاط لتطوير المواهب الفنية",
            cta: "اعرف المزيد",
          },
          {
            title: "برامج الوعي المجتمعي",
            description:
              "برامج تثقيفية وتوعوية تسلط الضوء على قضايا المجتمع والتراث المحلي عبر التعلم التفاعلي.",
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
          "تصميم ذكي واستغلال أمثل للمساحة",
          "أرفف قابلة للطي ومقاعد مريحة",
          "تكنولوجيا حديثة تشمل الإنترنت وإضاءة LED والتكييف",
          "نظام طاقة شمسية وسهولة وصول لذوي الإعاقة",
        ],
      },
      targetAudience: {
        title: "الفئات المستهدفة",
        description:
          "تخدم المبادرة شرائح متنوعة مع تركيز خاص على المناطق والمجتمعات الأقل وصولاً للخدمات الثقافية.",
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
          "يجمع المشروع بين الزيارات الميدانية والمشاركة المجتمعية والمتابعة الرقمية لضمان فعالية الخدمة.",
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
          "يعتمد توسيع الأثر واستدامة الخدمة على التعاون مع جهات ومساهمين من قطاعات متعددة.",
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
          "يُقاس أثر المشروع من خلال مؤشرات عملية تعكس الوصول الثقافي والقيمة الاجتماعية المتحققة.",
        stats: [
          { label: "عدد المستفيدين", value: "متزايد" },
          { label: "عدد الفعاليات", value: "مستمر" },
          { label: "إحصائيات الإعارة", value: "متابعة" },
          { label: "الأثر الاجتماعي", value: "ملموس" },
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
          "دعمك يساعد المشروع على توسيع خدماته المتنقلة وإثراء موارده واستدامة وصول الثقافة إلى المناطق الأقل خدمة.",
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
          "يرجى استبدال هذه البيانات التجريبية بالبيانات البنكية الرسمية للمشروع قبل الإطلاق النهائي.",
        fields: [
          { label: "اسم البنك", value: "بنك النور المجتمعي" },
          {
            label: "اسم الحساب",
            value: "المكتبة المتنقلة للثقافة والفنون",
          },
          { label: "رقم الحساب", value: "00124578963" },
          { label: "الآيبان", value: "JO94NBRB001245789630000000001" },
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
          "يمكن مستقبلاً ربط الصفحة ببوابة دفع إلكتروني عندما يصبح المشروع جاهزًا لذلك.",
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
