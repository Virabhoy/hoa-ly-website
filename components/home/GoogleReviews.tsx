import { Star, ExternalLink, Quote } from "lucide-react";
import type { GooglePlaceData, GoogleReview } from "@/lib/supabase/types";
import { CloudMotif } from "@/components/ui/ChineseMotifs";

// ─── Avis de démonstration ────────────────────────────────────────
const DEMO_DATA: GooglePlaceData = {
  name: "Hoa Ly",
  rating: 4.8,
  totalRatings: 147,
  reviews: [
    {
      rating: 5,
      text: "Boutique magnifique ! La sélection est très bien faite et les conseils des vendeuses sont précieux. J'ai trouvé ma robe de soirée parfaite ici. Je reviendrai sans hésiter.",
      authorName: "Sophie M.",
      authorPhoto: null,
      relativeTime: "il y a 2 semaines",
    },
    {
      rating: 5,
      text: "Un vrai coup de cœur ! Des vêtements de qualité à des prix très accessibles. L'ambiance est chaleureuse, le service impeccable. Un incontournable du 13e.",
      authorName: "Camille D.",
      authorPhoto: null,
      relativeTime: "il y a 1 mois",
    },
    {
      rating: 5,
      text: "J'adore cette boutique, j'y reviens à chaque saison. La collection automne-hiver est superbe cette année. La gérante a un œil parfait pour choisir ses pièces.",
      authorName: "Marie L.",
      authorPhoto: null,
      relativeTime: "il y a 3 semaines",
    },
    {
      rating: 5,
      text: "Service exceptionnel et vêtements de belle qualité. La vitrine donne envie d'entrer et on ne ressort jamais les mains vides. Merci à toute l'équipe !",
      authorName: "Isabelle R.",
      authorPhoto: null,
      relativeTime: "il y a 1 semaine",
    },
    {
      rating: 4,
      text: "Très belle boutique avec une sélection originale et tendance. Personnel attentionné et de bons conseils. Je recommande vivement pour trouver des pièces uniques.",
      authorName: "Nguyen T.",
      authorPhoto: null,
      relativeTime: "il y a 2 mois",
    },
  ],
};

interface GoogleReviewsProps {
  data: GooglePlaceData | null;
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? "fill-[#C8A882] text-[#C8A882]" : "text-[#D5C9BC] fill-[#D5C9BC]"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: GoogleReview; index: number }) {
  const initials = review.authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const bgColors = [
    "bg-[#C8A882]",
    "bg-[#1A2B4C]",
    "bg-[#5C6641]",
    "bg-[#C0392B]",
    "bg-[#888888]",
  ];

  return (
    <div className="bg-white p-7 flex flex-col gap-4 h-full">
      {/* Quote icon */}
      <Quote size={24} className="text-[#C8A882] opacity-60 flex-shrink-0" />

      {/* Text */}
      <p className="text-sm text-[#3A3A3A] leading-relaxed flex-1 italic">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#F0EDE8]">
        {review.authorPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.authorPhoto}
            alt={review.authorName}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${bgColors[index % bgColors.length]}`}
          >
            {initials}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-[#0A0A0A]">{review.authorName}</p>
          <p className="text-xs text-[#6B6B6B]">{review.relativeTime}</p>
        </div>
        {/* Google logo */}
        <svg
          className="ml-auto flex-shrink-0 opacity-40"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
    </div>
  );
}

export default function GoogleReviews({ data }: GoogleReviewsProps) {
  // Utilise les données réelles si disponibles, sinon les données de démo
  const display = data ?? DEMO_DATA;

  return (
    <section className="relative bg-[#F0EDE8] py-20 overflow-hidden">
      <CloudMotif className="pointer-events-none absolute -top-2 right-4 w-72 sm:w-96 text-motif opacity-20" />
      <CloudMotif className="pointer-events-none absolute bottom-4 -left-10 w-64 sm:w-80 text-motif opacity-15 -scale-x-100" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-3">
              Ce que disent nos clientes
            </p>
            <h2
              className="text-4xl font-light tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Avis Google
            </h2>

            {/* Note globale */}
            <div className="flex items-center gap-4 mt-5">
              <span
                className="text-6xl font-light leading-none"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {display.rating.toFixed(1)}
              </span>
              <div className="space-y-1">
                <StarRating rating={Math.round(display.rating)} size={16} />
                <p className="text-xs text-[#6B6B6B] tracking-wide">
                  {display.totalRatings} avis vérifiés
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Hoa+Ly+Paris+75013"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border border-[#0A0A0A] px-6 py-3 hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200 flex-shrink-0"
          >
            Voir tous les avis <ExternalLink size={11} />
          </a>
        </div>

        {/* Grille des avis — 3 colonnes desktop, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {display.reviews.slice(0, 3).map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>

        {/* Avis supplémentaires (4e et 5e) — bande horizontale */}
        {display.reviews.length > 3 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {display.reviews.slice(3, 5).map((review, i) => (
              <div key={i} className="bg-white/60 px-7 py-5 flex items-start gap-5">
                <Quote size={18} className="text-[#C8A882] opacity-50 flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#3A3A3A] leading-relaxed italic line-clamp-2">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <StarRating rating={review.rating} size={11} />
                    <span className="text-xs text-[#6B6B6B]">— {review.authorName}</span>
                    <span className="text-xs text-[#C8C8C8]">{review.relativeTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bandeau de confiance */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { value: display.rating.toFixed(1) + "/5", label: "Note moyenne" },
            { value: display.totalRatings + "+", label: "Avis clients" },
            { value: "100%", label: "Avis vérifiés Google" },
          ].map((stat) => (
            <div key={stat.label} className="px-6">
              <p
                className="text-3xl font-light text-[#0A0A0A]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
