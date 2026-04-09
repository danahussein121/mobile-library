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
    projects: {
      title: string;
      description: string;
      items: ProjectCard[];
    };
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
    siteName: "Mobile Library",
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
        eyebrow: "Community reading initiative",
        title: "Bringing Books to Every Child",
        description:
          "Mobile Library brings story-filled visits, read-aloud moments, and creative learning activities directly into neighborhoods so children can discover books in places that feel familiar, joyful, and safe.",
        primaryAction: "Explore Programs",
        secondaryAction: "Donate Now",
        image: sharedImages.hero,
        imageAlt: "Children enjoying books and reading together",
        floatingCard: {
          title: "A reading space that arrives with care",
          description:
            "Our team meets children where they already gather, turning ordinary spaces into welcoming moments of story, curiosity, and connection.",
        },
      },
      about: {
        title: "Who We Are",
        description:
          "Mobile Library is a community-driven initiative that brings books directly to children in neighborhoods, schools, and public spaces. Through read-aloud sessions, storytelling, and creative educational activities, we create warm encounters with books that help children feel seen, inspired, and excited to learn.",
      },
      missionCards: [
        {
          title: "Our Mission",
          description:
            "To nurture a reading culture by taking books and learning opportunities directly to children and families.",
        },
        {
          title: "Our Vision",
          description:
            "A future where every child grows up surrounded by stories, imagination, and the confidence to keep learning.",
        },
        {
          title: "Our Values",
          description:
            "Access, empathy, creativity, and community partnership shape every visit, session, and interaction.",
        },
      ],
      howItWorks: {
        title: "How It Works",
        description:
          "Our model combines community insight, thoughtful planning, and on-the-ground delivery to create lasting reading experiences.",
        steps: [
          {
            title: "Ideation",
            description:
              "We listen to communities, identify needs, and design reading experiences that feel relevant and welcoming.",
          },
          {
            title: "Design",
            description:
              "We curate books, activities, and workshop formats that match the age group, place, and learning goals.",
          },
          {
            title: "Implementation",
            description:
              "Our mobile library visits schools and neighborhoods to deliver sessions, books, and meaningful engagement.",
          },
        ],
      },
      programs: {
        title: "Programs & Activities",
        description:
          "Every activity is designed to make reading feel personal, engaging, and easy to return to long after the visit ends.",
        items: [
          {
            title: "Reading Sessions",
            description:
              "Guided group reading moments that help children explore stories, language, and imagination together.",
            image: sharedImages.reading,
            alt: "Children sitting together during a reading session",
          },
          {
            title: "Storytelling",
            description:
              "Interactive storytelling activities that turn books into exciting shared experiences full of wonder.",
            image: sharedImages.storytelling,
            alt: "A facilitator telling a story to children",
          },
          {
            title: "Workshops",
            description:
              "Creative educational workshops that combine literacy, arts, participation, and hands-on exploration.",
            image: sharedImages.workshops,
            alt: "Children participating in an educational workshop",
          },
          {
            title: "School Visits",
            description:
              "Visits to schools and community spaces that make quality books and learning activities easier to access.",
            image: sharedImages.schoolVisits,
            alt: "Children at school with books and learning materials",
          },
        ],
      },
      projects: {
        title: "Featured Projects",
        description:
          "These projects deepen our reach through recurring visits, neighborhood partnerships, and literacy experiences designed around real community rhythms.",
        items: [
          {
            title: "Neighborhood Reading Corners",
            description:
              "Comfortable pop-up reading spaces that invite children and caregivers to sit, browse, and read together.",
            image: sharedImages.projectOne,
            alt: "Outdoor educational activities with children",
            cta: "Learn More",
          },
          {
            title: "School Literacy Caravan",
            description:
              "A rotating school visit model that pairs book access with interactive reading activities teachers can build on later.",
            image: sharedImages.projectTwo,
            alt: "Children reading during a school literacy visit",
            cta: "Learn More",
          },
          {
            title: "Creative Learning Week",
            description:
              "A themed week of books, workshops, and family-friendly moments that celebrate reading as a shared community habit.",
            image: sharedImages.projectThree,
            alt: "Children smiling during a creative workshop",
            cta: "Learn More",
          },
        ],
      },
      impact: {
        title: "Our Impact",
        description:
          "Each visit creates a meaningful moment of access, encouragement, and belonging around learning.",
        stats: [
          { label: "Children Reached", value: "4,500+" },
          { label: "Books Delivered", value: "12,000+" },
          { label: "Communities Visited", value: "38" },
          { label: "Events Conducted", value: "120+" },
        ],
      },
      events: {
        title: "Upcoming & Recent Events",
        description:
          "Our calendar brings books into everyday community life through open gatherings, school visits, and public reading moments.",
        items: [
          {
            title: "Spring Reading Caravan",
            date: "May 14, 2026",
            description:
              "A full-day neighborhood visit with open reading circles, take-home books, and welcoming family activities.",
            image: sharedImages.eventOne,
            alt: "Children attending a reading event",
          },
          {
            title: "Storytelling Under the Trees",
            date: "June 02, 2026",
            description:
              "An outdoor storytelling afternoon designed to make books feel social, joyful, and easy to love.",
            image: sharedImages.eventTwo,
            alt: "Outdoor storytelling gathering",
          },
          {
            title: "Community Workshop Day",
            date: "June 19, 2026",
            description:
              "A creative literacy day combining hands-on crafts, book discovery, and short educational workshops.",
            image: sharedImages.eventThree,
            alt: "Creative community workshop",
          },
        ],
      },
      donateCta: {
        title: "Help Us Put More Books Into More Small Hands",
        description:
          "Your support helps us reach more neighborhoods, expand our mobile collection, and create more moments in which a child feels that learning belongs to them.",
        button: "Donate Now",
      },
    },
    pages: {
      about: {
        title: "About Mobile Library",
        description:
          "A people-centered initiative designed to make reading visible, accessible, and loved in every community we visit.",
      },
      programs: {
        title: "Programs & Activities",
        description:
          "From storytelling to school visits, our programs are built to turn access to books into lasting engagement.",
      },
      projects: {
        title: "Projects",
        description:
          "Focused initiatives that deepen our impact through local partnerships, themed campaigns, and repeated visits.",
      },
      events: {
        title: "Events",
        description:
          "Community visits, open reading gatherings, and literacy moments that bring our mission into public spaces.",
      },
      donate: {
        title: "Support the Mission",
        description:
          "Every contribution helps us reach more children with books, stories, and educational opportunities.",
      },
      contact: {
        title: "Contact Us",
        description:
          "We would love to hear from partners, schools, volunteers, and supporters who want to help grow this mission.",
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
          { label: "Account Name", value: "Mobile Library Initiative" },
          { label: "Account Number", value: "00124578963" },
          { label: "IBAN", value: "JO94NBRB001245789630000000001" },
        ],
        referenceNote:
          "Please include 'MobileLibraryDonation' as reference",
      },
      form: {
        title: "Notify Us About Your Transfer",
        description:
          "This form is for interface purposes only and can later connect to your preferred backend or CMS workflow.",
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
          "A future version can integrate a payment gateway or a CMS-managed donation provider.",
      },
      cta: {
        title: "Want to sponsor a full reading visit?",
        button: "Contact Our Team",
      },
    },
    contact: {
      title: "Let’s Build a Reading Culture Together",
      description:
        "Reach out to host a school visit, support a neighborhood stop, or partner with us as a donor, school, or volunteer team.",
      details: [
        { label: "Email", value: "hello@mobilelibrary.org" },
        { label: "Phone", value: "+962 7 9000 1234" },
        { label: "Address", value: "Amman, Jordan" },
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
        "Mobile Library delivers books, read-aloud sessions, and creative literacy activities directly to children in neighborhoods and schools.",
      contactLabel: "Contact",
      socialLabel: "Social Media",
      donateLabel: "Support the mission",
      rights: "All rights reserved.",
      socialLinks: [
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  },
  ar: {
    siteName: "المكتبة المتنقلة",
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
        eyebrow: "مبادرة مجتمعية للقراءة",
        title: "ننقل الكتب إلى كل طفل",
        description:
          "المكتبة المتنقلة تصل إلى الأحياء والمدارس بزيارات محمّلة بالكتب والقصص والأنشطة الإبداعية، حتى يلتقي الأطفال بالقراءة في أماكن يشعرون فيها بالألفة والفرح والأمان.",
        primaryAction: "استكشف البرامج",
        secondaryAction: "تبرع الآن",
        image: sharedImages.hero,
        imageAlt: "أطفال يقرؤون الكتب معًا",
        floatingCard: {
          title: "مساحة قراءة تصل إلى الطفل بحب",
          description:
            "نذهب إلى حيث يجتمع الأطفال لنحوّل المكان إلى لحظة دافئة من الحكاية والفضول والتواصل مع الكتاب.",
        },
      },
      about: {
        title: "من نحن",
        description:
          "المكتبة المتنقلة مبادرة مجتمعية توصل الكتب مباشرة إلى الأطفال في الأحياء والمدارس والمساحات العامة. من خلال جلسات القراءة والسرد القصصي والأنشطة التعليمية الإبداعية نصنع علاقة دافئة مع الكتاب، ونمنح الأطفال تجربة تعلم يشعرون فيها بالقرب والاهتمام والفرح.",
      },
      missionCards: [
        {
          title: "رسالتنا",
          description:
            "تعزيز حب القراءة عبر إيصال الكتب والفرص التعليمية مباشرة إلى الأطفال والأسر في مجتمعاتهم.",
        },
        {
          title: "رؤيتنا",
          description:
            "مستقبل ينشأ فيه كل طفل محاطًا بالقصص والخيال والثقة التي تدفعه لمواصلة التعلم.",
        },
        {
          title: "قيمنا",
          description:
            "نؤمن بالإتاحة والتعاطف والإبداع والعمل مع المجتمع في كل زيارة وكل نشاط نقدمه.",
        },
      ],
      howItWorks: {
        title: "كيف نعمل",
        description:
          "يعتمد نموذجنا على فهم احتياجات المجتمع والتخطيط الجيد والتنفيذ الميداني لصناعة تجربة قراءة مستدامة.",
        steps: [
          {
            title: "الفكرة",
            description:
              "نستمع إلى المجتمع ونحدد الاحتياجات ثم نصمم تجارب قراءة مناسبة وجاذبة للأطفال.",
          },
          {
            title: "التصميم",
            description:
              "نختار الكتب والأنشطة والورش بما يلائم الفئة العمرية والمكان والأهداف التعليمية.",
          },
          {
            title: "التنفيذ",
            description:
              "تزور المكتبة المتنقلة المدارس والأحياء لتقديم الجلسات والكتب والتفاعل المباشر مع الأطفال.",
          },
        ],
      },
      programs: {
        title: "البرامج والأنشطة",
        description:
          "نصمم كل نشاط ليجعل القراءة تجربة قريبة ومحببة وسهلة العودة إليها بعد انتهاء الزيارة.",
        items: [
          {
            title: "جلسات القراءة",
            description:
              "جلسات جماعية موجهة تساعد الأطفال على اكتشاف القصص واللغة والخيال بشكل مشترك.",
            image: sharedImages.reading,
            alt: "أطفال يشاركون في جلسة قراءة",
          },
          {
            title: "السرد القصصي",
            description:
              "أنشطة تفاعلية تحول القصص إلى تجربة حية وممتعة ومليئة بالدهشة والمشاركة.",
            image: sharedImages.storytelling,
            alt: "ميسرة تروي قصة للأطفال",
          },
          {
            title: "الورش التعليمية",
            description:
              "ورش إبداعية تجمع بين القراءة والفنون والتجربة العملية لتنمية المهارات والخيال.",
            image: sharedImages.workshops,
            alt: "أطفال يشاركون في ورشة تعليمية",
          },
          {
            title: "الزيارات المدرسية",
            description:
              "زيارات إلى المدارس والمساحات المجتمعية لتسهيل الوصول إلى الكتب والأنشطة التعليمية.",
            image: sharedImages.schoolVisits,
            alt: "أطفال في مدرسة مع كتب وأنشطة تعليمية",
          },
        ],
      },
      projects: {
        title: "مشاريع مميزة",
        description:
          "توسع هذه المشاريع أثر المكتبة المتنقلة عبر مبادرات متكررة وشراكات محلية وتجارب قرائية تنسجم مع حياة المجتمع اليومية.",
        items: [
          {
            title: "زوايا القراءة في الأحياء",
            description:
              "مساحات قراءة مؤقتة ومريحة تدعو الأطفال والأسر إلى الجلوس واكتشاف الكتب والقراءة معًا.",
            image: sharedImages.projectOne,
            alt: "أنشطة تعليمية خارجية مع الأطفال",
            cta: "اعرف المزيد",
          },
          {
            title: "قافلة القراءة المدرسية",
            description:
              "برنامج زيارات مدرسية متنقل يجمع بين توفير الكتب وأنشطة تفاعلية يمكن للمعلمين البناء عليها لاحقًا.",
            image: sharedImages.projectTwo,
            alt: "أطفال يقرؤون خلال زيارة مدرسية",
            cta: "اعرف المزيد",
          },
          {
            title: "أسبوع التعلم الإبداعي",
            description:
              "أسبوع مليء بالكتب والورش والأنشطة العائلية التي تحتفي بالقراءة كعادة جميلة ومشتركة.",
            image: sharedImages.projectThree,
            alt: "أطفال سعداء خلال ورشة إبداعية",
            cta: "اعرف المزيد",
          },
        ],
      },
      impact: {
        title: "أثرنا",
        description:
          "كل زيارة نصنع من خلالها لحظة حقيقية من الإتاحة والتشجيع والانتماء حول التعلم والقراءة.",
        stats: [
          { label: "عدد الأطفال المستفيدين", value: "+4500" },
          { label: "عدد الكتب الموزعة", value: "+12000" },
          { label: "المجتمعات التي زرناها", value: "38" },
          { label: "الفعاليات المنفذة", value: "+120" },
        ],
      },
      events: {
        title: "فعاليات قادمة وحديثة",
        description:
          "يجعل برنامج فعالياتنا القصص جزءًا حيًا من الحياة اليومية عبر لقاءات مفتوحة وزيارات مدرسية وتجارب قراءة في قلب المجتمع.",
        items: [
          {
            title: "قافلة القراءة الربيعية",
            date: "14 مايو 2026",
            description:
              "زيارة مجتمعية ليوم كامل تتضمن حلقات قراءة مفتوحة وكتبًا للإعارة وأنشطة عائلية مرحبة بالجميع.",
            image: sharedImages.eventOne,
            alt: "أطفال يشاركون في فعالية قراءة",
          },
          {
            title: "حكايات تحت الأشجار",
            date: "02 يونيو 2026",
            description:
              "لقاء خارجي للسرد القصصي يجعل الكتاب أكثر فرحًا وقربًا وحضورًا في ذاكرة الأطفال.",
            image: sharedImages.eventTwo,
            alt: "فعالية سرد قصصي في الهواء الطلق",
          },
          {
            title: "يوم الورش المجتمعية",
            date: "19 يونيو 2026",
            description:
              "فعالية إبداعية تجمع بين الأعمال اليدوية واكتشاف الكتب وورشًا تعليمية قصيرة وممتعة.",
            image: sharedImages.eventThree,
            alt: "ورشة مجتمعية إبداعية",
          },
        ],
      },
      donateCta: {
        title: "ساعدنا في وضع المزيد من الكتب بين أيدي الأطفال",
        description:
          "دعمك يساعدنا على الوصول إلى أحياء جديدة وتوسيع مكتبتنا المتنقلة وصناعة لحظات يشعر فيها الطفل أن التعلم حق قريب منه.",
        button: "تبرع الآن",
      },
    },
    pages: {
      about: {
        title: "عن المكتبة المتنقلة",
        description:
          "مبادرة إنسانية تجعل القراءة أقرب للأطفال وأكثر حضورًا في المجتمع الذي يعيشون فيه.",
      },
      programs: {
        title: "البرامج والأنشطة",
        description:
          "من السرد القصصي إلى الزيارات المدرسية، نقدم برامج تحول الوصول إلى الكتب إلى تجربة مستمرة وملهمة.",
      },
      projects: {
        title: "المشاريع",
        description:
          "مبادرات نوعية تعمق أثرنا عبر الشراكات المحلية والحملات الموضوعية والزيارات المتكررة.",
      },
      events: {
        title: "الفعاليات",
        description:
          "زيارات مجتمعية ولقاءات قرائية وفعاليات تجعل رسالتنا حاضرة في المساحات العامة.",
      },
      donate: {
        title: "ادعم الرسالة",
        description:
          "كل مساهمة تساعدنا على الوصول إلى مزيد من الأطفال بالكتب والقصص والفرص التعليمية.",
      },
      contact: {
        title: "تواصل معنا",
        description:
          "يسعدنا التواصل مع المدارس والشركاء والمتطوعين والداعمين الراغبين في توسيع أثر المبادرة.",
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
          { label: "اسم الحساب", value: "مبادرة المكتبة المتنقلة" },
          { label: "رقم الحساب", value: "00124578963" },
          { label: "الآيبان", value: "JO94NBRB001245789630000000001" },
        ],
        referenceNote:
          "يرجى إضافة 'MobileLibraryDonation' كمرجع للتحويل",
      },
      form: {
        title: "أبلغنا بالتحويل",
        description:
          "هذا النموذج للواجهة فقط ويمكن ربطه لاحقًا بنظامك الخلفي أو بمنصة إدارة المحتوى.",
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
          "يمكن مستقبلاً ربط الصفحة ببوابة دفع أو مزود تبرعات تتم إدارته عبر نظام محتوى.",
      },
      cta: {
        title: "هل ترغب في رعاية زيارة قرائية كاملة؟",
        button: "تواصل مع فريقنا",
      },
    },
    contact: {
      title: "لنصنع ثقافة قراءة معًا",
      description:
        "تواصل معنا لتنظيم زيارة مدرسية أو دعم محطة مجتمعية أو الشراكة معنا كجهة داعمة أو فريق تطوعي.",
      details: [
        { label: "البريد الإلكتروني", value: "hello@mobilelibrary.org" },
        { label: "الهاتف", value: "+962 7 9000 1234" },
        { label: "العنوان", value: "عمّان، الأردن" },
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
        "المكتبة المتنقلة توصل الكتب وجلسات القراءة والأنشطة القرائية الإبداعية مباشرة إلى الأطفال في الأحياء والمدارس.",
      contactLabel: "تواصل",
      socialLabel: "وسائل التواصل",
      donateLabel: "ادعم المبادرة",
      rights: "جميع الحقوق محفوظة.",
      socialLinks: [
        { label: "إنستغرام", href: "#" },
        { label: "فيسبوك", href: "#" },
        { label: "لينكدإن", href: "#" },
      ],
    },
  },
};

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}
