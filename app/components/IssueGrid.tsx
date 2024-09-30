import React from 'react'
import IssueCard from './IssueCard'

const issues = [
  { image: 'https://th.bing.com/th/id/OIP.ZmCFDtlnBPRbz5NpJK0E7QHaE7?rs=1&pid=ImgDetMain', location: 'Downtown', severity: 'Critical', upvotes: 15, description: 'Large pothole on Main St' },
  { image: 'https://static.toiimg.com/photo/imgsize-331336,msid-94463410/94463410.jpg', location: 'Suburb', severity: 'Major', upvotes: 8, description: 'Broken streetlight on Elm St' },
  { image: 'https://th.bing.com/th/id/OIP.KfSkVRsaCNX9Wnum_lVKSwHaDV?rs=1&pid=ImgDetMain', location: 'City Center', severity: 'Minor', upvotes: 3, description: 'Graffiti on public building' },
  { image: 'https://th.bing.com/th/id/OIP.SjpdL6Idm13p7mZUuVSfmgHaE8?rs=1&pid=ImgDetMain', location: 'Park Area', severity: 'Major', upvotes: 10, description: 'Damaged playground equipment' },
  { image: 'https://th.bing.com/th/id/OIP.__-1nRy9lJ28J1v6jVgpPgHaD2?rs=1&pid=ImgDetMain', location: 'Shopping District', severity: 'Critical', upvotes: 20, description: 'Burst water main on Market St' },
  { image: 'https://th.bing.com/th/id/R.380683b4a076551968ccffd9f42448eb?rik=%2fSD4WOb3haML%2bQ&riu=http%3a%2f%2finapcache.boston.com%2funiversal%2fsite_graphics%2fblogs%2fbigpicture%2findiapower%2fbp9.jpg&ehk=syZE3f9jdketTE%2fb8yFC2KRZS5wqYwtVGbCU5R0mxSc%3d&risl=&pid=ImgRaw&r=0', location: 'Residential Area', severity: 'Minor', upvotes: 5, description: 'Overgrown vegetation blocking sidewalk' },
  { image: 'https://th.bing.com/th/id/R.f30af16fd7210a8482f8e55d7f206091?rik=sNMeLzDo1dfvrA&riu=http%3a%2f%2finapcache.boston.com%2funiversal%2fsite_graphics%2fblogs%2fbigpicture%2findiapower%2fbp2.jpg&ehk=4FMpNSFVyDUpoFvkCGB%2bsRYrNBSuLGbPbM%2fc%2fU57AOI%3d&risl=&pid=ImgRaw&r=0', location: 'Shopping District', severity: 'Critical', upvotes: 20, description: 'Burst water main on Market St' },
  { image: 'https://th.bing.com/th/id/OIP.LZCWC56LMQCYPOwu6QP1pgHaE6?rs=1&pid=ImgDetMain', location: 'Residential Area', severity: 'Minor', upvotes: 5, description: 'Overgrown vegetation blocking sidewalk' },
]

export default function IssueGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {issues.map((issue, index) => (
        <IssueCard key={index} issue={issue} />
      ))}
    </div>
  )
}