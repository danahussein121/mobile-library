import type { Locale } from "@/lib/i18n";

type LegalSection = {
  title: string;
  body: string;
};

type LegalPageCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  noteTitle: string;
  note: string;
  sections: LegalSection[];
};

export const legalContent: Record<
  Locale,
  {
    privacy: LegalPageCopy;
    terms: LegalPageCopy;
  }
> = {
  en: {
    privacy: {
      eyebrow: "Privacy Policy",
      title: "How we handle your information",
      intro:
        "This temporary privacy notice explains how the Mobile Library for Culture and Arts handles contact and donation information while the project prepares its final legal documentation.",
      noteTitle: "Current status",
      note:
        "This page is a production-safe interim notice. It reflects our current practices and will be replaced with the final legal policy once the project completes its formal review.",
      sections: [
        {
          title: "Information we receive",
          body:
            "We only collect information that supporters choose to send through our contact and donation forms, such as name, email address, subject lines, message details, and transfer notes.",
        },
        {
          title: "How we use it",
          body:
            "We use submitted information to respond to inquiries, coordinate partnerships or visits, and follow up on donation notifications. We do not use this website to process online payments directly.",
        },
        {
          title: "Storage and sharing",
          body:
            "Form submissions are delivered to the project team through the configured email workflow. We do not sell personal information, and we only share details when needed to respond to a request or comply with a legal obligation.",
        },
        {
          title: "Questions or updates",
          body:
            "If you need to correct information you submitted or would like more detail about current handling practices, please contact the team directly at Mobile.library1@outlook.com.",
        },
      ],
    },
    terms: {
      eyebrow: "Terms of Service",
      title: "Using this website responsibly",
      intro:
        "These temporary terms describe the intended public use of the Mobile Library for Culture and Arts website while the project prepares its final launch documentation.",
      noteTitle: "Current status",
      note:
        "This is an interim public-use notice. It is written to be clear and trustworthy for launch, and it will be replaced by the final legal version after formal approval.",
      sections: [
        {
          title: "Website purpose",
          body:
            "This website shares information about the Mobile Library initiative, upcoming activities, donation pathways, and contact options for supporters, partners, schools, and community hosts.",
        },
        {
          title: "Content accuracy",
          body:
            "We aim to keep schedules, contact details, and program information accurate, but event availability, timings, and operational details may change as field plans are confirmed.",
        },
        {
          title: "Donations and inquiries",
          body:
            "Submitting a donation notice or contact request through the website does not create a legal contract or payment obligation. The project team may follow up separately to confirm next steps.",
        },
        {
          title: "Acceptable use",
          body:
            "Please use this site only for lawful communication and legitimate inquiries. Do not submit misleading information, attempt to disrupt the service, or misuse project branding or content.",
        },
      ],
    },
  },
  ar: {
    privacy: {
      eyebrow: "سياسة الخصوصية",
      title: "كيف نتعامل مع معلوماتكم",
      intro:
        "يوضح هذا الإشعار المؤقت كيفية تعامل مشروع المكتبة المتنقلة للثقافة والفنون مع معلومات التواصل والتبرع إلى حين اعتماد الصياغة القانونية النهائية.",
      noteTitle: "الوضع الحالي",
      note:
        "هذه صفحة مؤقتة وآمنة للنشر، وتعكس الممارسة الحالية للمشروع، وسيتم استبدالها بالنسخة القانونية النهائية بعد انتهاء المراجعة الرسمية.",
      sections: [
        {
          title: "المعلومات التي نستلمها",
          body:
            "نستقبل فقط المعلومات التي يختار الزوار إرسالها عبر نماذج التواصل أو إشعارات التبرع، مثل الاسم والبريد الإلكتروني وموضوع الرسالة وتفاصيلها وملاحظات التحويل.",
        },
        {
          title: "كيفية استخدامها",
          body:
            "نستخدم هذه المعلومات للرد على الاستفسارات، وتنسيق الشراكات أو الزيارات، ومتابعة إشعارات التبرع. ولا يستخدم هذا الموقع لمعالجة المدفوعات الإلكترونية مباشرة.",
        },
        {
          title: "الحفظ والمشاركة",
          body:
            "تصل الرسائل المرسلة عبر الموقع إلى فريق المشروع من خلال نظام البريد الإلكتروني المعتمد. نحن لا نبيع المعلومات الشخصية، ولا نشاركها إلا عند الحاجة للرد على الطلب أو للالتزام بمتطلب قانوني.",
        },
        {
          title: "الاستفسارات أو التحديث",
          body:
            "إذا رغبتم في تصحيح معلومات سبق إرسالها أو معرفة مزيد من التفاصيل حول آلية التعامل الحالية، يمكنكم التواصل مباشرة عبر البريد Mobile.library1@outlook.com.",
        },
      ],
    },
    terms: {
      eyebrow: "شروط الخدمة",
      title: "استخدام الموقع بشكل مسؤول",
      intro:
        "توضح هذه الشروط المؤقتة كيفية استخدام موقع المكتبة المتنقلة للثقافة والفنون خلال مرحلة الإطلاق الحالية إلى حين اعتماد الوثائق القانونية النهائية.",
      noteTitle: "الوضع الحالي",
      note:
        "هذا إشعار مؤقت للاستخدام العام، صيغ ليكون واضحًا وآمنًا للنشر، وسيتم استبداله بالنسخة القانونية النهائية بعد الاعتماد الرسمي.",
      sections: [
        {
          title: "غرض الموقع",
          body:
            "يعرض هذا الموقع معلومات عن مبادرة المكتبة المتنقلة والفعاليات والبرامج وطرق الدعم والتواصل مع الشركاء والمدارس والمجتمعات المستضيفة.",
        },
        {
          title: "دقة المحتوى",
          body:
            "نحرص على إبقاء المواعيد وبيانات التواصل ومعلومات البرامج دقيقة قدر الإمكان، لكن تفاصيل الفعاليات والزيارات قد تتغير مع تأكيد الخطط الميدانية.",
        },
        {
          title: "التبرعات والاستفسارات",
          body:
            "إرسال إشعار تبرع أو طلب تواصل عبر الموقع لا يشكل عقدًا قانونيًا أو التزامًا بالدفع. وقد يتواصل فريق المشروع لاحقًا لتأكيد الخطوات التالية.",
        },
        {
          title: "الاستخدام المقبول",
          body:
            "يرجى استخدام الموقع لأغراض مشروعة واستفسارات حقيقية فقط، وعدم إرسال معلومات مضللة أو محاولة تعطيل الخدمة أو إساءة استخدام هوية المشروع أو محتواه.",
        },
      ],
    },
  },
};
