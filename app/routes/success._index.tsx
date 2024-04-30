import { Link } from "@remix-run/react";
import { ArrowRightIcon, CircleCheckIcon } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";

export default function Index() {
	return (
		<div className="overflow-hidden bg-white py-32 h-screen items-center flex bg-gradient-to-br from-green-100 to-red-100">
			<div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
					<div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
						<h2 className="text-3xl font-bold tracking-tight text-green-500 sm:text-4xl flex items-center">
							Pendaftaran sudah masuk{" "}
							<CircleCheckIcon className="inline size-10 ml-3" />
						</h2>
						<p className="mt-6 text-xl leading-8 text-gray-600">
							Terima kasih telah mendaftar di sekolah kami. Kami akan segera
							memproses data yang Bapak/Ibu berikan. Jika ada pertanyaan lebih
							lanjut, jangan ragu untuk menghubungi kami.
						</p>
						<p className="mt-6 text-base leading-7 text-gray-600">
							Setelah proses validasi selesai, kami akan mengirimkan link untuk
							pembayaran biaya pendaftaran.
						</p>
						<div className="mt-10 flex">
							<Link to="/" className={buttonVariants({ variant: "default" })}>
								Kembali ke Laman Utama
								<ArrowRightIcon className="size-5 ml-2" />
							</Link>
						</div>
					</div>
					<div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
						<div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
							<img
								src="hero-tk.webp"
								alt=""
								className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
							/>
						</div>
						<div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
							<div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
								<img
									src="hero-sd.webp"
									alt=""
									className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
								/>
							</div>
							<div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
								<img
									src="hero-smp.png"
									alt=""
									className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
								/>
							</div>
							<div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
								<img
									src="hero-sma.webp"
									alt=""
									className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
