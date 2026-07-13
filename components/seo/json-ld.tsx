import { SITE } from "@/lib/salon/config";
import { OPENING_HOURS } from "@/lib/salon/data";

export function JsonLd() {
  const openingHours = OPENING_HOURS.filter((h) => !h.closed).map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.weekdays.map((d) =>
      ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d]
    ),
    opens: h.hours.split("–")[0]?.trim(),
    closes: h.hours.split("–")[1]?.trim(),
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: SITE.legalName,
    alternateName: SITE.name,
    description: SITE.description,
    url: SITE.website,
    telephone: SITE.phone,
    email: SITE.email,
    image: SITE.website,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.addressLines[0],
      postalCode: "2037 AB",
      addressLocality: "Haarlem",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.3874,
      longitude: 4.6462,
    },
    openingHoursSpecification: openingHours,
    priceRange: "€€",
    areaServed: "Haarlem",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
