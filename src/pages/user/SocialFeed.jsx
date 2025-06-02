// import React from 'react';

// const posts = [
//   {
//     id: 1,
//     username: 'Rahul Dev',
//     initials: 'RD',
//     content: 'A decentralized platform to share startup ideas anonymously and gain real-time feedback!',
//     tags: ['#Web3', '#Startups'],
//     likes: 12,
//     comments: 4,
//     timeAgo: '2h ago',
//   },
//   {
//     id: 2,
//     username: 'Anjali S',
//     initials: 'AS',
//     content: 'AI-powered personal productivity assistant that organizes your mind like Notion does with notes.',
//     tags: ['#AI', '#Productivity'],
//     likes: 27,
//     comments: 8,
//     timeAgo: '4h ago',
//   },
// ];

// export default function SocialFeed() {
//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">🧠 ManoSangam - Idea Feed</h1>
//       {posts.map((post) => (
//         <div
//           key={post.id}
//           className="bg-white shadow-md rounded-xl p-4 mb-4 border border-gray-100 hover:shadow-lg transition"
//         >
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
//               {post.initials}
//             </div>
//             <div>
//               <p className="font-medium">{post.username}</p>
//               <span className="text-sm text-gray-500">{post.timeAgo}</span>
//             </div>
//           </div>

//           <p className="text-gray-800 mb-3">{post.content}</p>

//           <div className="flex flex-wrap gap-2 mb-3">
//             {post.tags.map((tag, idx) => (
//               <span
//                 key={idx}
//                 className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-1 rounded-full"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>

//           <div className="flex items-center gap-4 text-sm text-gray-600">
//             <button className="hover:text-blue-600">❤️ {post.likes}</button>
//             <button className="hover:text-blue-600">💬 {post.comments}</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
