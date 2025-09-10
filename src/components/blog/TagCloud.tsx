'use client';


import { motion, AnimatePresence } from 'framer-motion';

interface TagCloudProps {
  tags: string[];
  selectedTags?: string[];
  onTagClick?: (tag: string) => void;
}

export default function TagCloud({ tags, selectedTags = [], onTagClick }: TagCloudProps) {
  // 根据标签长度和位置计算不同的大小
  const getTagSize = (index: number) => {
    const sizes = [
      'text-xs px-2 py-1',
      'text-sm px-3 py-1.5',
      'text-base px-4 py-2',
      'text-lg px-5 py-2.5',
      'text-xl px-6 py-3'
    ];
    return sizes[index % sizes.length];
  };

  const getColorClass = (tag: string, index: number) => {
    const isSelected = selectedTags?.includes(tag);
    const colors = [
      'bg-blue-50 text-blue-700 ring-blue-700/10',
      'bg-green-50 text-green-700 ring-green-700/10',
      'bg-purple-50 text-purple-700 ring-purple-700/10',
      'bg-yellow-50 text-yellow-700 ring-yellow-700/10',
      'bg-red-50 text-red-700 ring-red-700/10',
      'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
      'bg-pink-50 text-pink-700 ring-pink-700/10',
      'bg-gray-50 text-gray-700 ring-gray-700/10'
    ];
    
    const baseColor = colors[index % colors.length];
    
    if (isSelected) {
      return baseColor
        .replace(/50/g, '600')
        .replace(/700/g, 'white')
        .replace(/ring-.*?(?=\s|$)/, 'ring-2 ring-offset-2 ring-' + baseColor.split(' ')[0].split('-')[1] + '-500');
    }
    
    return baseColor;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">标签云</h3>
      
      <div className="flex flex-wrap gap-3">
        <AnimatePresence>
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className={`inline-flex items-center rounded-full font-medium ring-1 ring-inset cursor-pointer transition-all duration-200 hover:scale-110 ${
                getColorClass(tag, index)
              } ${getTagSize(index)}`}
              onClick={() => onTagClick?.(tag)}
            >
              {tag}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}