import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        primary:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success:
          "border-transparent bg-green-600 text-white shadow hover:bg-green-700",
        danger:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        warning:
          "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-600",
        info:
          "border-transparent bg-blue-500 text-white shadow hover:bg-blue-600",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
      size: {
        small: "text-xs px-2 py-0.5",
        medium: "text-sm px-2.5 py-0.5",
        large: "text-base px-3 py-1",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
      pill: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  status?: 'published' | 'draft' | 'archived' | 'pending' | 'rejected';
  userRole?: 'admin' | 'moderator' | 'user' | 'guest';
  showIcon?: boolean;
}

function Badge({ className, variant, type, status, userRole, size, pill, showIcon, children, ...props }: BadgeProps) {
  void showIcon; // Keep for API compatibility
  
  let actualVariant = variant;
  let actualContent = children;

  // Before 호환: type prop 지원
  if (type) {
    actualVariant = type as any;
  }

  // Before 호환: status prop 지원
  if (status) {
    switch (status) {
      case 'published':
        actualVariant = 'success';
        actualContent = actualContent || '게시됨';
        break;
      case 'draft':
        actualVariant = 'warning';
        actualContent = actualContent || '임시저장';
        break;
      case 'archived':
        actualVariant = 'secondary';
        actualContent = actualContent || '보관됨';
        break;
      case 'pending':
        actualVariant = 'info';
        actualContent = actualContent || '대기중';
        break;
      case 'rejected':
        actualVariant = 'danger';
        actualContent = actualContent || '거부됨';
        break;
    }
  }

  // Before 호환: userRole prop 지원
  if (userRole) {
    switch (userRole) {
      case 'admin':
        actualVariant = 'danger';
        actualContent = actualContent || '관리자';
        break;
      case 'moderator':
        actualVariant = 'warning';
        actualContent = actualContent || '운영자';
        break;
      case 'user':
        actualVariant = 'primary';
        actualContent = actualContent || '사용자';
        break;
      case 'guest':
        actualVariant = 'secondary';
        actualContent = actualContent || '게스트';
        break;
    }
  }

  return (
    <div className={cn(badgeVariants({ variant: actualVariant, size, pill }), className)} {...props}>
      {actualContent}
    </div>
  )
}

export { Badge, badgeVariants }
