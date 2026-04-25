export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-muted-foreground text-center text-sm">
          © {new Date().getFullYear()} Музей. Все права защищены.
        </p>
      </div>
    </footer>
  )
}
