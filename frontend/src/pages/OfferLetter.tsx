import { useState, useRef, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OfferLetter() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleAnalyze = () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/result'); }, 2500);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upload Offer Letter</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Upload your offer letter to verify its authenticity.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card p-6 space-y-5">
        {/* Drop Zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !file && inputRef.current?.click()}
          className={cn(
            'relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all',
            dragging ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/40 hover:bg-muted/30',
            file && 'cursor-default'
          )}
        >
          <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.png,.jpg" className="hidden" onChange={e => e.target.files?.[0] && setFile(e.target.files[0])} />
          {file ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-success-light flex items-center justify-center">
                <FileText className="w-7 h-7 text-success" />
              </div>
              <div>
                <p className="font-semibold text-sm">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatSize(file.size)}</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setFile(null); }}
                className="inline-flex items-center gap-1.5 text-xs text-danger hover:bg-danger-light px-3 py-1.5 rounded-lg transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Remove file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Drop your file here, or <span className="text-primary">browse</span></p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, PNG, JPG up to 10MB</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-muted/50 rounded-xl p-4">
          <p className="text-xs font-semibold text-foreground mb-2">What we analyze:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            {['Company letterhead and branding authenticity', 'Signature and stamp verification', 'Salary and terms red flag detection', 'Contact details cross-referencing'].map(item => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="w-full gradient-hero text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" />Analyzing Document...</>
          ) : (
            <><Upload className="w-4 h-4" />Analyze Offer Letter</>
          )}
        </button>
      </div>
    </div>
  );
}
