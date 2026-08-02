export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-subtle">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="text-text-muted text-xs">© {year} Ritam Saha</p>
        <p className="text-text-muted text-xs">Made with intentional simplicity.</p>
      </div>
    </footer>
  )
}
