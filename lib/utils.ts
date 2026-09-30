// Version légère de l'utilitaire `cn` de shadcn/ui (sans dépendance).
// Si vous initialisez shadcn (`npx shadcn@latest init`), il le remplacera par
// la version clsx + tailwind-merge.
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}
