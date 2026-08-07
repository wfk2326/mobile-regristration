import { useState, useEffect, useRef } from 'react';
import {
  Copy,
  Check,
  Share2,
  Trophy,
  Users,
  User,
  Building2,
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Loader2,
  X,
  ListChecks,
  ScrollText,
} from 'lucide-react';
import {
  supabase,
  KATEGORI_LOMBA,
  DIVISI_OPTIONS,
  type Registration,
  type TipeLomba,
  type KategoriLomba,
} from '@/lib/supabase';
import RulesView from '@/components/RulesView';
import { RULES } from '@/lib/rules-data';

type Step = 'kategori' | 'form' | 'success' | 'rules';

function App() {
  const [step, setStep] = useState<Step>('kategori');
  const [selectedKategori, setSelectedKategori] = useState<KategoriLomba | null>(null);
  const [nama, setNama] = useState('');
  const [divisi, setDivisi] = useState('');
  const [namaTim, setNamaTim] = useState('');
  const [anggota, setAnggota] = useState(['', '', '', '']);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showList, setShowList] = useState(false);
  const [recent, setRecent] = useState<Registration[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);

  const tipeLabels: Record<TipeLomba, string> = {
    INDIVIDU: 'Individu',
    TEAM: 'Tim (4 orang)',
    ANTAR_DIVISI: 'Antar Divisi',
  };

  const tipeIcons: Record<TipeLomba, typeof User> = {
    INDIVIDU: User,
    TEAM: Users,
    ANTAR_DIVISI: Building2,
  };

  const grouped = {
    INDIVIDU: KATEGORI_LOMBA.filter((k) => k.tipe === 'INDIVIDU'),
    TEAM: KATEGORI_LOMBA.filter((k) => k.tipe === 'TEAM'),
    ANTAR_DIVISI: KATEGORI_LOMBA.filter((k) => k.tipe === 'ANTAR_DIVISI'),
  };

  // Parallax scroll
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (showList) loadRecent();
  }, [showList]);

  const loadRecent = async () => {
    const { data } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (data) setRecent(data as Registration[]);
  };

  const handleSelectKategori = (k: KategoriLomba) => {
    setSelectedKategori(k);
    setNama('');
    setDivisi('');
    setNamaTim('');
    setAnggota(['', '', '', '']);
    setError(null);
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKategori) return;
    setError(null);

    if (!nama.trim()) {
      setError('Nama wajib diisi.');
      return;
    }

    let payload: Record<string, unknown> = {
      nama: nama.trim(),
      kategori: selectedKategori.nama,
      tipe_lomba: selectedKategori.tipe,
    };

    if (selectedKategori.tipe === 'TEAM') {
      const filledAnggota = anggota.map((a) => a.trim()).filter(Boolean);
      payload = {
        ...payload,
        nama_tim: namaTim.trim() || null,
        anggota_tim: filledAnggota.length > 0 ? filledAnggota : null,
      };
    }

    if (selectedKategori.tipe === 'ANTAR_DIVISI') {
      if (!divisi) {
        setError('Pilih divisi terlebih dahulu.');
        return;
      }
      payload = { ...payload, divisi };
      const filledAnggota = anggota.map((a) => a.trim()).filter(Boolean);
      payload = {
        ...payload,
        nama_tim: namaTim.trim() || null,
        anggota_tim: filledAnggota.length > 0 ? filledAnggota : null,
      };
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from('registrations').insert(payload);
    setSubmitting(false);

    if (insertError) {
      setError('Gagal mendaftar. Coba lagi.');
      return;
    }
    setStep('success');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pendaftaran Lomba 17 Agustus',
          text: 'Yuk daftar lomba 17 Agustus! Klik link ini untuk mendaftar.',
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const reset = () => {
    setStep('kategori');
    setSelectedKategori(null);
    setNama('');
    setDivisi('');
    setNamaTim('');
    setAnggota(['', '', '', '']);
    setError(null);
  };

  return (
    <div className="min-h-screen relative">
      {/* ── Parallax background ── */}
      <div
        ref={bgRef}
        aria-hidden
        className="fixed inset-0 -z-20 w-full h-full"
        style={{
          backgroundImage: 'url(/images/image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.35}px) scale(1.2)`,
          transformOrigin: 'top center',
          willChange: 'transform',
        }}
      />
      {/* Dark overlay so content stays readable */}
      <div aria-hidden className="fixed inset-0 -z-10 bg-black/55" />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30 bg-white/10 backdrop-blur-md border-b border-white/15 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <img
            src="/logo_sagna_ADP_KSO_copy.png"
            alt="SACNA-ADP KSO"
            className="h-10 sm:h-12 object-contain"
          />
          <div className="text-center flex-1 px-3">
            <p className="text-xs sm:text-sm font-semibold text-white leading-tight drop-shadow">
              Lomba 17 Agustus
            </p>
            <p className="text-[10px] sm:text-xs text-white/75 leading-tight">HUT RI ke-81</p>
          </div>
          <img
            src="/HUT_81.png"
            alt="HUT RI ke-81"
            className="h-10 sm:h-12 object-contain"
          />
        </div>
      </header>

      {/* ── HERO BAND ── */}
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg tracking-tight">
          Pendaftaran Lomba
        </h1>
        <p className="mt-1 text-white/80 text-sm">Internal Proyek · Tanpa Login</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white rounded-full px-3 py-1.5 border border-white/20">
            <Calendar className="w-3 h-3" /> 17 Agustus 2026
          </span>
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white rounded-full px-3 py-1.5 border border-white/20">
            <MapPin className="w-3 h-3" /> SACNA-ADP KSO
          </span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="relative max-w-2xl mx-auto px-4 pb-24 space-y-4">
        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600/90 hover:bg-red-600 active:bg-red-700 backdrop-blur-sm text-white font-medium rounded-2xl px-4 py-3 text-sm shadow transition-colors border border-red-500/40"
          >
            <Share2 className="w-4 h-4" />
            Bagikan Link
          </button>
          <button
            onClick={() => setShowList(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 active:bg-white/35 backdrop-blur-sm text-white font-medium rounded-2xl px-4 py-3 text-sm shadow transition-colors border border-white/25"
          >
            <ListChecks className="w-4 h-4" />
            Lihat Pendaftar
          </button>
        </div>

        {/* Step: Kategori */}
        {step === 'kategori' && (
          <div className="space-y-5">
            {(Object.keys(grouped) as TipeLomba[]).map((tipe) => {
              const Icon = tipeIcons[tipe];
              return (
                <section key={tipe}>
                  <div className="flex items-center gap-2 mb-2.5 px-1">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h2 className="text-sm font-semibold text-white drop-shadow">
                      {tipeLabels[tipe]}
                    </h2>
                    <span className="text-xs text-white/60">
                      {grouped[tipe].length} lomba
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {grouped[tipe].map((k) => (
                      <div
                        key={k.nama}
                        className="group flex items-center gap-3 bg-white/85 backdrop-blur-sm hover:bg-white border border-white/60 hover:border-red-300 rounded-2xl p-4 transition-all shadow-md"
                      >
                        <button
                          onClick={() => handleSelectKategori(k)}
                          className="flex items-center gap-3 flex-1 min-w-0 text-left active:scale-[0.99] transition-transform"
                        >
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-2xl shrink-0">
                            {k.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm leading-snug">
                              {k.nama}
                            </p>
                            {k.deskripsi && (
                              <p className="text-xs text-gray-500 mt-0.5">{k.deskripsi}</p>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors shrink-0" />
                        </button>
                        {RULES[k.nama] ? (
                          <button
                            onClick={() => {
                              setSelectedKategori(k);
                              setStep('rules');
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg px-2.5 py-2 shrink-0 transition-colors"
                          >
                            <ScrollText className="w-3.5 h-3.5" />
                            Peraturan
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Step: Rules (inline) */}
        {step === 'rules' && selectedKategori && RULES[selectedKategori.nama] && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg p-4">
              <RulesView doc={RULES[selectedKategori.nama]} onDaftar={() => handleSelectKategori(selectedKategori)} />
            </div>
          </div>
        )}

        {/* Step: Form */}
        {step === 'form' && selectedKategori && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Pilih kategori lain
            </button>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
              <div className="flex items-center gap-3 p-4 bg-red-50/80 border-b border-red-100">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-2xl shadow-sm">
                  {selectedKategori.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{selectedKategori.nama}</p>
                  <p className="text-xs text-red-700 font-medium">{tipeLabels[selectedKategori.tipe]}</p>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Tulis nama lengkap"
                    className="w-full rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 px-4 py-3 text-sm outline-none transition-colors bg-white"
                    autoComplete="off"
                  />
                </div>

                {/* Divisi (ANTAR_DIVISI only) */}
                {selectedKategori.tipe === 'ANTAR_DIVISI' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Divisi <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={divisi}
                      onChange={(e) => setDivisi(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 px-4 py-3 text-sm outline-none transition-colors bg-white"
                    >
                      <option value="">Pilih divisi</option>
                      {DIVISI_OPTIONS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Nama Tim */}
                {(selectedKategori.tipe === 'TEAM' || selectedKategori.tipe === 'ANTAR_DIVISI') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nama Tim <span className="text-gray-400 text-xs">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      value={namaTim}
                      onChange={(e) => setNamaTim(e.target.value)}
                      placeholder="Contoh: Tim Merah Putih"
                      className="w-full rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 px-4 py-3 text-sm outline-none transition-colors bg-white"
                      autoComplete="off"
                    />
                  </div>
                )}

                {/* Anggota Tim */}
                {(selectedKategori.tipe === 'TEAM' || selectedKategori.tipe === 'ANTAR_DIVISI') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Anggota Tim <span className="text-gray-400 text-xs">(opsional, maks 4)</span>
                    </label>
                    <div className="space-y-2">
                      {anggota.map((a, i) => (
                        <input
                          key={i}
                          type="text"
                          value={a}
                          onChange={(e) => {
                            const next = [...anggota];
                            next[i] = e.target.value;
                            setAnggota(next);
                          }}
                          placeholder={`Anggota ${i + 1}`}
                          className="w-full rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 px-4 py-2.5 text-sm outline-none transition-colors bg-white"
                          autoComplete="off"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-60 text-white font-semibold rounded-xl px-4 py-3.5 text-sm shadow-sm transition-colors"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</>
                  ) : (
                    <><Trophy className="w-4 h-4" /> Daftar Sekarang</>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step: Success */}
        {step === 'success' && selectedKategori && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-5 rounded-full bg-green-100">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Pendaftaran Berhasil!</h2>
            <p className="mt-2 text-sm text-gray-600 px-2">
              <strong className="text-gray-900">{nama}</strong> terdaftar untuk lomba{' '}
              <strong className="text-red-700">{selectedKategori.nama}</strong>.
              {selectedKategori.tipe === 'ANTAR_DIVISI' && divisi && (
                <> Divisi: <strong>{divisi}</strong>.</>
              )}
            </p>
            <div className="mt-6 space-y-2.5">
              <button
                onClick={reset}
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-4 py-3.5 text-sm shadow-sm transition-colors"
              >
                <Trophy className="w-4 h-4" /> Daftar Lomba Lain
              </button>
              <button
                onClick={handleShare}
                className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl px-4 py-3 text-sm border border-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4" /> Ajak Teman Daftar
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center pb-10 px-4">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/90 transition-colors"
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5 text-green-400" /> Link disalin!</>
          ) : (
            <><Copy className="w-3.5 h-3.5" /> Salin link pendaftaran</>
          )}
        </button>
      </footer>

      {showList && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">Daftar Pendaftar</h3>
                <span className="text-xs bg-red-100 text-red-700 rounded-full px-2 py-0.5 font-medium">
                  {recent.length}
                </span>
              </div>
              <button
                onClick={() => setShowList(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-3 space-y-2">
              {recent.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-10">Belum ada pendaftar.</p>
              ) : (
                recent.map((r) => {
                  const k = KATEGORI_LOMBA.find((k) => k.nama === r.kategori);
                  return (
                    <div key={r.id} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-xl shrink-0">
                        {k?.icon || '🏆'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{r.nama}</p>
                        <p className="text-xs text-gray-500 truncate">{r.kategori}</p>
                        {r.divisi && (
                          <p className="text-xs text-gray-400 truncate mt-0.5">Divisi: {r.divisi}</p>
                        )}
                        {r.nama_tim && (
                          <p className="text-xs text-gray-400 truncate mt-0.5">Tim: {r.nama_tim}</p>
                        )}
                        {r.anggota_tim && r.anggota_tim.length > 0 && (
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            Anggota: {r.anggota_tim.join(', ')}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 whitespace-nowrap">
                        {new Date(r.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
