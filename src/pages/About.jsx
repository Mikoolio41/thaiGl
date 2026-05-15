import { Link } from "react-router-dom";
import SeriesTag from "../components/SeriesTag";

const PAIRINGS = [
  {
    name: "FreenBecky",
    members: "Freen Sarocha & Becky Armstrong",
    shows: ["GAP The Series", "The Loyal Pin"],
    note: "The pairing that launched Thai GL into a global phenomenon.",
  },
  {
    name: "EngLot",
    members: "Engfa Waraha & Charlotte Austin",
    shows: [
      "Show Me Love",
      "Petrichor",
      "Unlimited Love",
      "4 Elements: The Water",
      "Love Bully",
    ],
    note: "Started with Show Me Love — their collaboration keeps expanding.",
  },
  {
    name: "LMSY",
    members: "Lookmhee & Sonya",
    shows: ["Affair", "Harmony Secret", "Hometown Romance"],
    note: "Part of the GAP universe. Hometown Romance is their third GL together.",
  },
  {
    name: "MilkLove",
    members: "Milk Pansa & Love Pattranite",
    shows: ["23.5"],
    note: "GMMTV's flagship GL pairing. 23.5 is available on Netflix.",
  },
  {
    name: "LingOrm",
    members: "Lingling Sirilak Kwong & Orm Kornnaphat Sethratanapong",
    shows: ["The Secret of Us"],
    note: "Their Netflix debut The Secret of Us made LingOrm one of Thai GL's most recognised international pairings of 2024.",
  },
];

export default function About() {
  return (
    <div className="pt-24 pb-20 px-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="section-subtitle mb-3">About</p>
        <h1 className="font-display text-display-lg italic text-zinc-100">
          Emenize Ben Yafit
          <span className="block text-gradient-rose text-2xl mt-1 not-italic font-normal tracking-widest">
            สัพพรส
          </span>
        </h1>
        <p className="font-body text-zinc-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
          "All flavors" — because Thai GL is exactly that: every genre, every
          emotion, every era. This site exists to celebrate the shows and
          couples that have changed the landscape of Asian drama.
        </p>
      </div>

      {/* Decorative rule */}
      <div
        className="h-px mb-12"
        style={{
          background:
            "linear-gradient(90deg, transparent, #7c4d6e, #c9a84c, #7c4d6e, transparent)",
        }}
      />

      {/* What is Thai GL */}
      <section className="mb-12 space-y-4">
        <h2 className="font-display text-xl italic text-zinc-200">
          What is Thai GL?
        </h2>
        <p className="font-body text-sm text-zinc-400 leading-relaxed">
          Thai Girl's Love (GL) is the genre of Thai dramas centered on romantic
          relationships between women. It emerged as a distinct genre with{" "}
          <strong className="text-zinc-300">GAP The Series</strong> in 2022 —
          the first full-length Thai GL — and has since grown into one of the
          most creatively active spaces in Southeast Asian drama, with multiple
          shows releasing every year across channels like ONE31, Channel 3,
          Channel 7, WeTV, iQIYI, and GMMTV.
        </p>
        <p className="font-body text-sm text-zinc-400 leading-relaxed">
          The genre gained truly international attention with{" "}
          <strong className="text-zinc-300">The Loyal Pin</strong> (2024) —
          Thailand's first GL period drama — which trended in 38 countries and
          surpassed 300 million views.
        </p>
      </section>

      {/* Pairings */}
      <section className="mb-12">
        <h2 className="font-display text-xl italic text-zinc-200 mb-6">
          Major Pairings
        </h2>
        <div className="grid gap-4">
          {PAIRINGS.map((pairing) => (
            <div
              key={pairing.name}
              className="card-base p-5 space-y-3 hover:border-mauve-deep/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-display text-lg italic text-zinc-100">
                    {pairing.name}
                  </h3>
                  <p className="font-body text-xs text-zinc-500 mt-0.5">
                    {pairing.members}
                  </p>
                </div>
              </div>
              <p className="font-body text-sm text-zinc-400">{pairing.note}</p>
              <div className="flex flex-wrap gap-1.5">
                {pairing.shows.map((show) => (
                  <SeriesTag key={show} tag={show} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quizzes CTA */}
      <section className="text-center bg-gradient-mauve rounded-2xl border border-mauve-deep/30 px-6 py-10">
        <p className="font-body text-xs tracking-widest uppercase text-mauve-pale mb-3">
          Ready?
        </p>
        <h2 className="font-display text-display-md italic text-zinc-100 mb-2">
          Test what you know
        </h2>
        <p className="font-body text-zinc-400 text-sm mb-6">
          From easy couple-matching to hard lore questions — there's a quiz for
          every fan level.
        </p>
        <Link to="/quizzes" className="btn-primary">
          Browse All Quizzes
        </Link>
      </section>

      {/* Footer note */}
      <p className="font-body text-xs text-zinc-700 text-center mt-12">
        Fan site · All show information is for entertainment purposes · Not
        affiliated with any studio or broadcaster
      </p>
    </div>
  );
}
