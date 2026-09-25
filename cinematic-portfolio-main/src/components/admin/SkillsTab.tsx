import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { SkillBlock } from '../../types/portfolio';

export const SkillsTab: React.FC = () => {
  const { data, updateSkills } = usePortfolio();
  const [skillsBlocks, setSkillsBlocks] = useState<SkillBlock[]>(data.skills);
  const [savedMsg, setSavedMsg] = useState('');

  const handleCategoryNameChange = (blockIdx: number, newName: string) => {
    const updated = [...skillsBlocks];
    updated[blockIdx] = { ...updated[blockIdx], category: newName };
    setSkillsBlocks(updated);
  };

  const handleCategoryIconChange = (blockIdx: number, newIcon: string) => {
    const updated = [...skillsBlocks];
    updated[blockIdx] = { ...updated[blockIdx], icon: newIcon };
    setSkillsBlocks(updated);
  };

  const handleSkillItemChange = (blockIdx: number, itemIdx: number, field: 'name' | 'level', value: any) => {
    const updated = [...skillsBlocks];
    const items = [...(updated[blockIdx].items as any[])];
    const curr = typeof items[itemIdx] === 'string' ? { name: items[itemIdx], level: 85 } : items[itemIdx];
    items[itemIdx] = { ...curr, [field]: field === 'level' ? Number(value) : value };
    updated[blockIdx] = { ...updated[blockIdx], items };
    setSkillsBlocks(updated);
  };

  const addSkillItem = (blockIdx: number) => {
    const updated = [...skillsBlocks];
    const items = [...(updated[blockIdx].items as any[])];
    updated[blockIdx] = {
      ...updated[blockIdx],
      items: [...items, { name: 'New Tech', level: 85 }],
    };
    setSkillsBlocks(updated);
  };

  const removeSkillItem = (blockIdx: number, itemIdx: number) => {
    const updated = [...skillsBlocks];
    const items = (updated[blockIdx].items as any[]).filter((_, i) => i !== itemIdx);
    updated[blockIdx] = { ...updated[blockIdx], items };
    setSkillsBlocks(updated);
  };

  const addCategoryBlock = () => {
    setSkillsBlocks([
      ...skillsBlocks,
      {
        category: 'New Category',
        icon: '⚡',
        items: [{ name: 'Skill 1', level: 90 }],
      },
    ]);
  };

  const removeCategoryBlock = (blockIdx: number) => {
    if (window.confirm('Remove this entire skill category?')) {
      setSkillsBlocks(skillsBlocks.filter((_, i) => i !== blockIdx));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSkills(skillsBlocks);
    setSavedMsg('Skills & Expertise updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#8C6D4F]/30 pb-4">
        <div>
          <h3 className="text-xl font-light text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            SKILLS & CAPABILITIES MATRIX
          </h3>
          <p className="text-xs text-[#A8988B]">Configure tech stacks, categories, and proficiency meters.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addCategoryBlock}
            className="px-4 py-2 border border-[#8C6D4F] text-[#EAD8C7] text-xs font-semibold uppercase hover:border-[#D4AF37]"
          >
            + ADD CATEGORY
          </button>
          <button
            type="submit"
            className="px-6 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold uppercase hover:bg-transparent hover:text-[#D4AF37]"
          >
            SAVE SKILLS
          </button>
        </div>
      </div>

      {savedMsg && (
        <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] text-xs font-medium rounded-xs">
          ✓ {savedMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsBlocks.map((block, bIdx) => {
          const rawItems: any[] = block.items || [];

          return (
            <div key={bIdx} className="p-5 bg-black/70 border border-[#8C6D4F]/30 rounded-sm space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-[#8C6D4F]/20 pb-3">
                <input
                  type="text"
                  value={block.icon || '❖'}
                  onChange={(e) => handleCategoryIconChange(bIdx, e.target.value)}
                  className="w-10 bg-black border border-[#8C6D4F]/40 text-center text-sm text-[#D4AF37] p-1 outline-none"
                />
                <input
                  type="text"
                  value={block.category || block.title || ''}
                  onChange={(e) => handleCategoryNameChange(bIdx, e.target.value)}
                  className="flex-grow bg-black border border-[#8C6D4F]/40 text-xs font-semibold text-white px-3 py-1 outline-none uppercase"
                />
                <button
                  type="button"
                  onClick={() => removeCategoryBlock(bIdx)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  REMOVE ✕
                </button>
              </div>

              <div className="space-y-3">
                {rawItems.map((item, iIdx) => {
                  const name = typeof item === 'string' ? item : item.name;
                  const level = typeof item === 'object' && item !== null && 'level' in item ? item.level : 85;

                  return (
                    <div key={iIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => handleSkillItemChange(bIdx, iIdx, 'name', e.target.value)}
                        className="flex-grow bg-black/80 border border-[#8C6D4F]/30 px-2 py-1 text-xs text-white outline-none"
                      />
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={level}
                        onChange={(e) => handleSkillItemChange(bIdx, iIdx, 'level', e.target.value)}
                        className="w-16 bg-black/80 border border-[#8C6D4F]/30 px-2 py-1 text-xs text-[#D4AF37] font-mono text-center outline-none"
                      />
                      <span className="text-[10px] text-[#A8988B]">%</span>
                      <button
                        type="button"
                        onClick={() => removeSkillItem(bIdx, iIdx)}
                        className="text-red-400 hover:text-red-300 text-xs px-1"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => addSkillItem(bIdx)}
                className="w-full py-1.5 border border-dashed border-[#8C6D4F]/40 hover:border-[#D4AF37] text-[10px] text-[#A8988B] hover:text-white uppercase"
              >
                + ADD SKILL ITEM
              </button>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default SkillsTab;
