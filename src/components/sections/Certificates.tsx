'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface Certificate {
  id: number | string
  title: string
  image_url: string | null
  created_at: string | null
}

function certificateDate(value: string | null) {
  const date = value ? new Date(value) : null
  return date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      })
    : 'Date unavailable'
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true
    let requestId = 0

    const fetchCertificates = async () => {
      const currentRequest = ++requestId
      try {
        const { data, error: fetchError } = await supabase
          .from('certificates')
          .select('id, title, image_url, created_at')
          .order('created_at', { ascending: false })
          .returns<Certificate[]>()

        if (!mounted || currentRequest !== requestId) return
        setError(Boolean(fetchError))
        if (!fetchError) setCertificates(data ?? [])
      } catch {
        if (mounted && currentRequest === requestId) setError(true)
      } finally {
        if (mounted && currentRequest === requestId) setLoading(false)
      }
    }

    const refresh = () => {
      if (document.visibilityState === 'visible') void fetchCertificates()
    }

    void fetchCertificates()
    const channel = supabase
      .channel('public-portfolio-certificates')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'certificates',
      }, refresh)
      .subscribe()

    // Also refresh without requiring Supabase Realtime to be enabled.
    const interval = window.setInterval(refresh, 30000)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)

    return () => {
      mounted = false
      window.clearInterval(interval)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
      void supabase.removeChannel(channel)
    }
  }, [])

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="w-full max-w-[1450px] mx-auto px-8 md:px-12 lg:px-20 pt-24 pb-24 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center mb-10"
      >
        <h2 id="certificates-heading" className="text-3xl md:text-5xl font-bold mb-3">
          Certificates
        </h2>
        <p className="text-white/55 max-w-xl mx-auto text-sm md:text-base">
          A collection of my certifications and learning milestones.
        </p>
      </motion.div>

      <div aria-live="polite" aria-busy={loading}>
        {loading ? (
          <p role="status" className="text-center text-sm text-white/50 py-16">
            Loading certificates...
          </p>
        ) : error ? (
          <p role="status" className="text-center text-sm text-white/50 py-16">
            Certificates are unavailable right now. Please try again shortly.
          </p>
        ) : certificates.length === 0 ? (
          <p className="rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl text-center text-sm text-white/50 py-16">
            No certificates to display yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-1">
            {certificates.map((certificate, index) => (
              <motion.article
                key={certificate.id}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.04 }}
                whileHover={{ y: -4 }}
                className="group rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              >
                {certificate.image_url ? (
                  <a
                    href={certificate.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View full certificate: ${certificate.title} (opens in a new tab)`}
                    className="relative block aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <Image
                      src={certificate.image_url}
                      alt={certificate.title}
                      fill
                      unoptimized
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain p-2"
                    />
                  </a>
                ) : (
                  <div className="aspect-[4/3] rounded-2xl border border-white/10 flex items-center justify-center text-sm text-white/40">
                    Image unavailable
                  </div>
                )}
                <h3 className="mt-4 text-[15px] font-semibold text-center text-white/90 break-words">
                  {certificate.title}
                </h3>
                <p className="mt-2 text-[11px] text-white/40 text-center">
                  {certificateDate(certificate.created_at)}
                </p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
