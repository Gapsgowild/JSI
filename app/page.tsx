import { ShoppingBag, Menu, Search, ArrowRight, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export default function CannabisStore() {
  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-widest">
              <a href="#" className="hover:text-primary transition-colors">
                Flowers
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Edibles
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Wellness
              </a>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-3xl font-serif italic tracking-tighter">Veridian.</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest hover:text-primary">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] text-white flex items-center justify-center rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/premium-cannabis-flower-macro-depth-of-field.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-90 scale-105 animate-pulse"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Cultivated Excellence
          </p>
          <h2 className="text-5xl md:text-8xl font-serif italic mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Elevate your <br /> state of being
          </h2>
          <button className="bg-white text-black px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all transform hover:scale-105 duration-300">
            Shop the Collection
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sativa", count: "12 Strains", img: "bright-uplifting-cannabis-plant" },
            { name: "Indica", count: "15 Strains", img: "dark-relaxing-cannabis-buds" },
            { name: "Hybrid", count: "18 Strains", img: "perfect-balance-cannabis-flower" },
          ].map((cat, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-muted">
                <Image
                  src={`/.jpg?height=800&width=600&query=${cat.img}`}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{cat.count}</p>
              <h3 className="text-2xl font-serif italic flex items-center gap-2 group-hover:text-primary transition-colors">
                {cat.name}{" "}
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-bold mb-4">Curated Selection</p>
            <h2 className="text-4xl md:text-6xl font-serif italic">Our Signature Blends</h2>
          </div>
          <button className="text-sm uppercase tracking-widest border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-all">
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {[
            { name: "Emerald Haze", type: "Sativa", price: "$45", tag: "Limited" },
            { name: "Midnight Dream", type: "Indica", price: "$55", tag: "Best Seller" },
            { name: "Golden Hour", type: "Hybrid", price: "$40", tag: "" },
            { name: "Arctic Frost", type: "Indica", price: "$60", tag: "Premium" },
          ].map((product, i) => (
            <div key={i} className="group">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-6 bg-secondary/20">
                {product.tag && (
                  <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                    {product.tag}
                  </span>
                )}
                <Image
                  src={`/premium-cannabis-bud-.jpg?height=600&width=600&query=premium-cannabis-bud-${i}`}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute inset-x-4 bottom-4 bg-primary text-white py-3 rounded-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-xs uppercase tracking-widest">
                  Add to Bag
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-serif mb-1 group-hover:text-primary transition-colors cursor-pointer">
                    {product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.type}</p>
                </div>
                <span className="font-medium">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image src="/modern-lifestyle-living-room-serene.jpg" alt="Lifestyle" fill className="object-cover" />
          </div>
          <div className="lg:pl-12">
            <h2 className="text-4xl md:text-6xl font-serif italic mb-8 leading-tight">
              A holistic approach to <span className="text-primary italic">botanical</span> wellness.
            </h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              We believe in the power of nature to restore balance. Our extracts are sourced from organic micro-farms,
              ensuring the purest expression of the plant.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h5 className="text-xs uppercase tracking-widest font-bold mb-2">Purity Tested</h5>
                <p className="text-sm text-muted-foreground">
                  Every batch is verified by third-party laboratories for zero additives.
                </p>
              </div>
              <div>
                <h5 className="text-xs uppercase tracking-widest font-bold mb-2">Ethical Sourcing</h5>
                <p className="text-sm text-muted-foreground">
                  Supporting small-scale growers who prioritize environmental health.
                </p>
              </div>
            </div>
            <button className="flex items-center gap-4 text-sm uppercase tracking-[0.2em] font-medium group">
              Learn Our Process
              <span className="w-12 h-[1px] bg-foreground group-hover:w-20 group-hover:bg-primary transition-all" />
            </button>
          </div>
        </div>
      </section>

      {/* Instagram Grid / Social */}
      <section className="py-24 border-t border-border">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] mb-4">Follow the Journey</p>
          <h2 className="text-3xl font-serif italic underline decoration-primary/30 decoration-8 underline-offset-8">
            @VeridianSocial
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1 px-1">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="relative aspect-square overflow-hidden group cursor-pointer">
              <Image
                src={`/lifestyle-aesthetic-greenery-.jpg?height=500&width=500&query=lifestyle-aesthetic-greenery-${idx}`}
                alt="Social item"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1">
            <h1 className="text-4xl font-serif italic mb-8">Veridian.</h1>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-accent" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-accent" />
            </div>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-widest font-bold mb-6 opacity-60">Shop</h5>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Flowers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Concentrates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Vapes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Apparel
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-widest font-bold mb-6 opacity-60">Company</h5>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Locations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-widest font-bold mb-6 opacity-60">Newsletter</h5>
            <p className="text-sm mb-6 opacity-80">Join our circle for exclusive drops and botanical insights.</p>
            <form className="flex border-b border-white/30 pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent text-sm w-full focus:outline-none placeholder:text-white/40"
              />
              <button type="submit" className="text-xs uppercase tracking-widest hover:text-accent">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 text-[10px] uppercase tracking-widest opacity-40 font-bold">
          <p>© 2025 Veridian Botanicals. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
