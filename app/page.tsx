"use client"

import { useState } from "react"
import { AuthScreen } from "@/components/auth-screen"
import { MapDashboard } from "@/components/map-dashboard"
import { MarketPrice } from "@/components/market-price"
import { UpdateStatus } from "@/components/update-status"
import { OrchardDetail } from "@/components/orchard-detail"
import { ActiveBuyers } from "@/components/active-buyers"
import { SettingsScreen } from "@/components/settings-screen"
import { SupportScreen } from "@/components/support-screen"
import { BuyerPricing } from "@/components/buyer-pricing"
import { BuyerListings } from "@/components/buyer-listings"
import { RoleProvider, type TabId, type UserRole } from "@/components/bottom-nav"

type Screen = "auth" | "detail" | "buyers" | "support" | TabId

export default function Page() {
  const [screen, setScreen] = useState<Screen>("auth")
  const [role, setRole] = useState<UserRole>("owner")

  // The "orchard" tab (สวนของฉัน) shows the orchard detail view.
  const navigate = (next: Screen) => {
    setScreen(next === "orchard" ? "detail" : next)
  }

  const handleAuthenticated = (nextRole: UserRole) => {
    setRole(nextRole)
    setScreen("map")
  }

  return (
    <RoleProvider role={role}>
      <main className="relative h-dvh overflow-hidden bg-background">
        {/* Screen 1: Login / Register */}
        <div className={screenClass(screen === "auth", "left")} aria-hidden={screen !== "auth"}>
          <AuthScreen onAuthenticated={handleAuthenticated} />
        </div>

        {/* Screen 2: Map Dashboard — shared by both roles */}
        <div className={screenClass(screen === "map", "right")} aria-hidden={screen !== "map"}>
          <MapDashboard
            onBack={() => setScreen("auth")}
            onSelectOrchard={() => setScreen("detail")}
            onShowBuyers={() => setScreen("buyers")}
            onNavigate={navigate}
          />
        </div>

        {/* Screen 3: Market Price — shared by both roles */}
        <div className={screenClass(screen === "price", "right")} aria-hidden={screen !== "price"}>
          <MarketPrice onNavigate={navigate} onShowBuyers={() => setScreen("buyers")} />
        </div>

        {/* Screen 6: Active Buyers — shared shortcut */}
        <div className={screenClass(screen === "buyers", "right")} aria-hidden={screen !== "buyers"}>
          <ActiveBuyers onBack={() => setScreen("map")} onNavigate={navigate} />
        </div>

        {/* Screen 7: Settings — shared by both roles */}
        <div className={screenClass(screen === "settings", "right")} aria-hidden={screen !== "settings"}>
          <SettingsScreen
            onNavigate={navigate}
            onEditProfile={() => setScreen(role === "owner" ? "update" : "pricing")}
            onContactSupport={() => setScreen("support")}
            onLogout={() => setScreen("auth")}
          />
        </div>

        {/* Screen 8: Contact Support — shared */}
        <div className={screenClass(screen === "support", "right")} aria-hidden={screen !== "support"}>
          <SupportScreen onBack={() => setScreen("settings")} onNavigate={navigate} />
        </div>

        {/* Owner-only screens */}
        {role === "owner" && (
          <>
            {/* Screen 4: Update Status & Profile Editor */}
            <div className={screenClass(screen === "update", "right")} aria-hidden={screen !== "update"}>
              <UpdateStatus onNavigate={navigate} onSave={() => setScreen("map")} />
            </div>

            {/* Screen 5: Orchard Detail View (also the "สวนของฉัน" tab) */}
            <div className={screenClass(screen === "detail", "right")} aria-hidden={screen !== "detail"}>
              <OrchardDetail
                onBack={() => setScreen("map")}
                onViewMap={() => setScreen("map")}
                onShowBuyers={() => setScreen("buyers")}
                onNavigate={navigate}
              />
            </div>
          </>
        )}

        {/* Buyer-only screens */}
        {role === "buyer" && (
          <>
            {/* Set Buy Price (ตั้งราคารับซื้อ) */}
            <div className={screenClass(screen === "pricing", "right")} aria-hidden={screen !== "pricing"}>
              <BuyerPricing onNavigate={navigate} onPublished={() => setScreen("listings")} />
            </div>

            {/* My Listings (ประกาศของฉัน) */}
            <div className={screenClass(screen === "listings", "right")} aria-hidden={screen !== "listings"}>
              <BuyerListings onNavigate={navigate} onCreate={() => setScreen("pricing")} />
            </div>
          </>
        )}
      </main>
    </RoleProvider>
  )
}

/** Slide-left / fade transition between mobile screens. */
function screenClass(active: boolean, from: "left" | "right") {
  const base =
    "absolute inset-0 overflow-y-auto transition-all duration-500 ease-out will-change-transform"
  if (active) return `${base} translate-x-0 opacity-100`
  const off = from === "left" ? "-translate-x-6" : "translate-x-6"
  return `${base} pointer-events-none ${off} opacity-0`
}
