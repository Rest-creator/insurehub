
import Container from '../ui/Container';
import FadeIn from '../animations/FadeIn';

const teamMembers = [
  {
    name: 'Wiston J Mambongo',
    role: 'CEO & Founder',
    image: 'https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/487477083_970114678640000_7937572767390785634_n.jpg?stp=c180.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=100&ccb=1-7&_nc_sid=50ad20&_nc_ohc=yXvhyHtCTWYQ7kNvwGqGuky&_nc_oc=AdkZxfL1HxKepG2n7RYbbJ7n2rFQOIrL80bWqC6Y67P8hdkw9T2wJieI5a4sy7mwBaQ&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=JfC-2EAaFIPdSIbfxJvB7w&oh=00_AfFXSdDOQaD2HgFWSCnnqpdX8fQZDTL_YeKjxcogsB6eNw&oe=67FCBAC2',
    bio: 'With experience in applications of technology in business , Winston founded InsureHub to transform how people interact with insurance products.'
  },
  {
    name: 'Tinotenda Mupezeni',
    role: 'Chief Technology Officer',
    image: 'https://media.licdn.com/dms/image/v2/D5622AQHBs6ixoquQfA/feedshare-shrink_480/B56ZXdJAvxGsAc-/0/1743171887661?e=1747267200&v=beta&t=4zUg1QucvdlmhnrokugyWg_COau3PQQFhMzPQA6QrQE',
    bio: 'Tinotenda leads our engineering team, bringing AI expertise.'
  },
  {
    name: 'Robson Kawa',
    role: 'Lead Software Engineer',
    image: 'https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/170694022_598255821101937_5366495910210610944_n.jpg?stp=c80.0.480.480a_dst-jpg_s480x480_tt6&_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=znRRS246oNMQ7kNvwGDJzdf&_nc_oc=Adm-ThkVG39X96UU2is_sUfn8-74ebifQMSq1UiBoVZVeUr5WgWNBbs4o1nPdpt9N_o&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=qCU2tD1HFu_bK4BcwqgaBQ&oh=00_AfFQV6aJh1hCXnvxsvgOrLmuxwboaEZaMtCk_O-GStauhg&oe=681E3B01',
    bio: 'Robson leads software development and manages our partnerships with insurance providers.'
  },
    {
    name: 'Mutsa Mutepfa',
    role: 'Operations Administrator',
    image: 'https://scontent-jnb2-1.xx.fbcdn.net/v/t1.6435-9/170694022_598255821101937_5366495910210610944_n.jpg?stp=c80.0.480.480a_dst-jpg_s480x480_tt6&_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=znRRS246oNMQ7kNvwGDJzdf&_nc_oc=Adm-ThkVG39X96UU2is_sUfn8-74ebifQMSq1UiBoVZVeUr5WgWNBbs4o1nPdpt9N_o&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=qCU2tD1HFu_bK4BcwqgaBQ&oh=00_AfFQV6aJh1hCXnvxsvgOrLmuxwboaEZaMtCk_O-GStauhg&oe=681E3B01',
    bio: 'Insurance industry veteran with 12 years experience in customer operations. Streamlined our claims processing to achieve 48-hour payouts. Dedicated to building trust through transparent, customer-centric service delivery.'
  },
  // {
  //   name: 'Jamie Winters',
  //   role: 'Customer Experience Director',
  //   image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //   bio: 'Jamie ensures our platform offers an intuitive, helpful experience with customer needs always at the forefront.'
  // },
  // {
  //   name: 'Raj Patel',
  //   role: 'Chief Product Officer',
  //   image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //   bio: 'Raj oversees product development, bringing innovative solutions to market based on customer feedback and industry trends.'
  // },
  // {
  //   name: 'Elena Martinez',
  //   role: 'Lead Data Scientist',
  //   image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  //   bio: 'Elena heads our data team, developing algorithms that help match customers with their ideal insurance products.'
  // }
];

const Team = () => {
  return (
    <section className="py-20 bg-insurance-neutral/50">
      <Container>
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-orange-light text-insurance-orange rounded-full mb-4">
              Our Team
            </span>
            <h2 className="heading-2 text-insurance-neutral-dark mb-6">
              Meet the People Behind InsureHub
            </h2>
            <p className="body-text">
              Our diverse team of insurance enthusiasts, technologists, and customer advocates work together to simplify insurance for everyone.
            </p>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <FadeIn key={index} direction="up" delay={100 * (index % 3)}>
              <div className="glass-card h-full overflow-hidden">
                <div className="aspect-w-3 aspect-h-2 mb-6">
                  <img 
                    src={member.image} 
                    alt={`${member.name}, ${member.role}`} 
                    className="object-cover w-full h-[400px] rounded-t-2xl"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-1">{member.name}</h3>
                  <p className="text-insurance-orange font-medium text-sm mb-4">{member.role}</p>
                  <p className="body-text">{member.bio}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Team;
