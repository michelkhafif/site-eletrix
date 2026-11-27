'use client';
import type { ComponentProps } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from './Button';
import { contactByPath, contactHref } from '@/data/services';

/** Botão para "Fale com a Eletrix" que já leva o perfil e o interesse da página em que está. */
export function ContactButton(props: Omit<ComponentProps<typeof Button>, 'href'>) {
  const pathname = usePathname() || '/';
  return <Button {...props} href={contactHref(contactByPath[pathname])} />;
}
