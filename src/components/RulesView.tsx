import type { RuleDoc, RuleBlock, RuleCard } from '@/lib/rules-data';

interface RulesViewProps {
  doc: RuleDoc;
  onDaftar: () => void;
}

function Block({ block }: { block: RuleBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-sm text-gray-700 leading-relaxed">{block.text}</p>;
    case 'list':
      return block.ordered ? (
        <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      ) : (
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="border border-gray-200 bg-gray-100 px-2.5 py-1.5 text-left font-bold text-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-200 px-2.5 py-1.5 text-gray-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <div className="bg-red-50 border-l-[3px] border-red-700 rounded-r-md px-3 py-2 text-sm text-gray-700">
          {block.text}
        </div>
      );
    case 'allowed':
      return (
        <div className="mb-3">
          <p className="text-sm font-semibold text-green-800 mb-1.5">✓ Peserta diperbolehkan:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {block.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      );
    case 'forbidden':
      return (
        <div>
          <p className="text-sm font-semibold text-red-700 mb-1.5">✗ Peserta tidak diperbolehkan:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {block.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

function CardView({ card }: { card: RuleCard }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm">
      <div className="inline-block bg-red-700 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-2.5">
        {card.number}. {card.title}
      </div>
      <div className="space-y-2">
        {card.body.map((block, i) => <Block key={i} block={block} />)}
      </div>
    </div>
  );
}

export default function RulesView({ doc, onDaftar }: RulesViewProps) {
  return (
    <div className="space-y-3">
      <div className="bg-red-800 text-white rounded-xl px-4 py-3.5 text-center">
        <h2 className="text-lg font-bold uppercase tracking-wide leading-tight">
          {doc.title}
        </h2>
        <p className="text-xs mt-1 text-red-100 italic">{doc.tagline}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-3">
          {doc.left.cards.map((card) => <CardView key={card.number} card={card} />)}
        </div>
        <div className="space-y-3">
          {doc.right.cards.map((card) => <CardView key={card.number} card={card} />)}
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-xl p-4">
        <div className="inline-block bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-2.5">
          Prinsip Lomba
        </div>
        <ul className="space-y-1.5 text-sm">
          {doc.prinsip.map((p) => (
            <li key={p.label}>
              <strong className="text-amber-300">· {p.label}:</strong> {p.text}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onDaftar}
        className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl px-4 py-3.5 text-sm shadow-sm transition-colors"
      >
        🏆 Daftar Lomba Ini
      </button>
    </div>
  );
}
