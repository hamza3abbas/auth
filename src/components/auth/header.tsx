import { poppins } from "@/src/lib/fonts";

import { cn } from "@/src/lib/utils";

const font = poppins;

interface CardHeaderProps {
    label: string;
    sublabel? : string;
}

export const Header = ({ label ,sublabel = '' }: CardHeaderProps) => {
    return (<div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <h1 className={cn("text-3xl font-semibold",)}>
            🔐 Auth
        </h1>
        <p className="text-muted-foreground text-sm text-center">
            {label}
        </p>
        {
            sublabel && (
                <p className="text-muted-foreground text-sm text-center">
                {sublabel}
            </p>
            )
        }
    </div>)
}  