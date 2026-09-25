import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project } from '../../types/portfolio';

const emptyProject: Omit<Project, 'id'> = {
  title: '',
  category: 'Full Stack',
  year: new Date().getFullYear().toString(),
  description: '',
  longDescription: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  tags: [],
};

export const ProjectsTab: React.FC = () => {
  const { data, addProject, updateProject, deleteProject } = usePortfolio();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState<Omit<Project, 'id'>>(emptyProject);
  const [tagInput, setTagInput] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const handleImageUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setForm((prev) => ({ ...prev, imageUrl: e.target?.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setIsAdding(false);
    setForm({
      title: project.title,
      category: project.category,
      year: project.year,
      description: project.description,
      longDescription: project.longDescription || '',
      imageUrl: project.imageUrl,
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      tags: project.tags || [],
    });
    setTagInput((project.tags || []).join(', '));
  };

  const startAdd = () => {
    setEditingId(null);
    setIsAdding(true);
    setForm(emptyProject);
    setTagInput('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm(emptyProject);
    setTagInput('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectData = {
      ...form,
      tags: parsedTags,
    };

    if (isAdding) {
      addProject(projectData);
      setSavedMsg('New project added successfully!');
    } else if (editingId) {
      updateProject(editingId, projectData);
      setSavedMsg('Project updated successfully!');
    }

    cancelEdit();
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete project "${title}"?`)) {
      deleteProject(id);
      setSavedMsg(`Project "${title}" deleted.`);
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#8C6D4F]/30 pb-4">
        <div>
          <h3 className="text-xl font-light text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            PROJECTS ARCHIVE MANAGER
          </h3>
          <p className="text-xs text-[#A8988B]">Add, modify, upload photos, and delete featured portfolio projects.</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={startAdd}
            className="px-5 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold tracking-widest uppercase hover:bg-transparent hover:text-[#D4AF37] transition-all"
          >
            + CREATE NEW PROJECT
          </button>
        )}
      </div>

      {savedMsg && (
        <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] text-xs font-medium rounded-xs">
          ✓ {savedMsg}
        </div>
      )}

      {/* Editor Form Modal / Drawer */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="p-6 bg-black/80 border border-[#D4AF37]/50 rounded-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#8C6D4F]/30 pb-3">
            <h4 className="text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              {isAdding ? 'ADD NEW PROJECT' : 'EDIT PROJECT DETAILS'}
            </h4>
            <button type="button" onClick={cancelEdit} className="text-xs text-[#A8988B] hover:text-white">
              CANCEL ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                CATEGORY
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Full Stack / Mobile / AI"
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                YEAR
              </label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            {/* Project Photo Upload & URL */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold">
                COVER IMAGE / PHOTO (UPLOAD OR ENTER URL)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://... or Data URL"
                  className="flex-grow bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
                />
                <label className="cursor-pointer px-3 py-2 border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-[10px] font-semibold tracking-wider uppercase transition-all rounded-xs whitespace-nowrap">
                  📷 BROWSE PHOTO
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  />
                </label>
              </div>

              {/* Photo Preview Thumbnail */}
              {form.imageUrl && (
                <div className="mt-2 relative rounded-xs overflow-hidden border border-[#8C6D4F]/40 h-28 bg-black/80 flex items-center justify-center p-1">
                  <img src={form.imageUrl} alt="Project cover preview" className="h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, imageUrl: '' })}
                    className="absolute top-2 right-2 bg-black/80 text-red-400 hover:text-red-300 text-xs px-2 py-0.5 border border-red-900/50 rounded-xs"
                  >
                    REMOVE ✕
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                LIVE DEMO URL
              </label>
              <input
                type="text"
                value={form.liveUrl || ''}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                GITHUB REPOSITORY URL
              </label>
              <input
                type="text"
                value={form.githubUrl || ''}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                TAGS (Comma Separated)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="React, Node.js, WebGL"
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                SHORT DESCRIPTION (Card Preview)
              </label>
              <textarea
                rows={2}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none resize-none"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                DETAILED CASE STUDY DESCRIPTION (Modal View)
              </label>
              <textarea
                rows={4}
                value={form.longDescription || ''}
                onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#8C6D4F]/30">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-2 border border-[#8C6D4F]/40 text-[#A8988B] text-xs font-semibold uppercase hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold uppercase hover:bg-transparent hover:text-[#D4AF37]"
            >
              SAVE PROJECT
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {data.projects.map((project) => (
          <div
            key={project.id}
            className="p-4 bg-black/60 border border-[#8C6D4F]/30 hover:border-[#D4AF37]/50 rounded-sm flex items-center justify-between gap-4 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <img
                src={project.imageUrl || 'https://via.placeholder.com/80'}
                alt={project.title}
                className="w-16 h-12 object-cover rounded-xs border border-[#8C6D4F]/30"
              />
              <div>
                <h4 className="text-base font-medium text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {project.title}
                </h4>
                <div className="flex items-center space-x-2 text-[10px] text-[#A8988B]">
                  <span className="text-[#D4AF37] font-semibold">{project.category}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => startEdit(project)}
                className="px-3 py-1.5 border border-[#8C6D4F]/40 hover:border-[#D4AF37] text-[#EAD8C7] text-xs uppercase"
              >
                EDIT
              </button>
              <button
                onClick={() => handleDelete(project.id, project.title)}
                className="px-3 py-1.5 border border-red-900/50 hover:border-red-500 text-red-400 text-xs uppercase"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
