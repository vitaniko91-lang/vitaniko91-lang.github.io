import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SocialLinks } from '../components/SocialLinks'
import { EMAIL } from '../data/contact'

/**
 * Contact — the closing invitation. A big confident Schibsted line makes the
 * ask, a quiet sub frames availability, and the email becomes the single hero
 * action: an oversized chartreuse mailto link with the signature grow-underline.
 * The social row sits below a hairline. One accent, lots of air.
 */
export function Contact() {
  return (
    <Section id="contact" className="border-t border-line">
      <Reveal>
        <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-faint">
          <span aria-hidden className="h-px w-7 bg-accent" />
          Contact
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-8 max-w-[18ch] font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.0] tracking-[-0.025em] text-paper">
          Have a project? <span className="text-accent">Let&rsquo;s build it.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-6 max-w-[48ch] font-sans text-lg leading-relaxed text-muted">
          Open to freelance and contract work — design and build, end to end. Tell me what
          you&rsquo;re making.
        </p>
      </Reveal>

      {/* The single hero action: the email itself, oversized and chartreuse. */}
      <Reveal delay={0.16}>
        <a
          href={`mailto:${EMAIL}`}
          aria-label={`Email ${EMAIL}`}
          className="group mt-10 inline-flex items-baseline gap-3 rounded-sm font-display text-[clamp(1.5rem,4.6vw,3rem)] font-semibold tracking-[-0.02em] text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-8"
        >
          <span className="relative">
            {EMAIL}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none motion-reduce:group-hover:scale-x-100"
            />
          </span>
          <Icon
            name="lucide:arrow-up-right"
            className="size-[clamp(1.25rem,3vw,2rem)] shrink-0 translate-y-1 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </a>
      </Reveal>

      {/* Socials, below a hairline. */}
      <Reveal delay={0.2}>
        <div className="mt-14 border-t border-line pt-8 md:mt-16">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-faint">
            Elsewhere
          </p>
          <SocialLinks withIcons className="mt-5" />
        </div>
      </Reveal>
    </Section>
  )
}
